#!/usr/bin/env python3
"""Auto-generates the SYSTEM_GUIDE.md file from repo state."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
from pathlib import Path
from textwrap import dedent
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "Frontend"
BACKEND = ROOT / "Backend"
GUIDE_PATH = ROOT / "SYSTEM_GUIDE.md"
TAILWIND_DOC = ROOT / "Tailwind"
REACT_DOC = ROOT / "React"


def read_json(path: Path) -> Dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def collect_next_info() -> Dict[str, str]:
    package = read_json(FRONTEND / "package.json")
    deps = package.get("dependencies", {})
    dev_deps = package.get("devDependencies", {})
    return {
        "next": deps.get("next", "unknown"),
        "react": deps.get("react", "unknown"),
        "typescript": dev_deps.get("typescript", "unknown"),
    }


def list_app_routes() -> List[str]:
    routes = []
    app_dir = FRONTEND / "app"
    if not app_dir.exists():
        return routes
    for path in app_dir.rglob("page.tsx"):
        rel = path.relative_to(app_dir)
        routes.append("/" + str(rel.parent).replace(os.sep, "/"))
    return sorted(routes)


def read_tailwind_tokens() -> List[str]:
    tokens: List[str] = []
    css_path = FRONTEND / "app" / "globals.css"
    if not css_path.exists():
        return tokens
    token_regex = re.compile(r"--([\w-]+):\s*([^;]+);")
    for line in css_path.read_text(encoding="utf-8").splitlines():
        match = token_regex.search(line.strip())
        if match:
            tokens.append(f"{match.group(1)} = {match.group(2).strip()}")
    return tokens


def parse_payment_endpoints() -> List[str]:
    controller = BACKEND / "Bidzy" / "API" / "Controllers" / "PaymentController.cs"
    if not controller.exists():
        return []
    text = controller.read_text(encoding="utf-8")
    pattern = re.compile(r"\[(Http[a-zA-Z]+)(?:\(\"([^\"]*)\"\))?\]")
    endpoints = []
    for method, route in pattern.findall(text):
        route_display = route or "/"
        endpoints.append(f"{method} {route_display}")
    return endpoints


def parse_payment_services() -> List[str]:
    service = BACKEND / "Bidzy" / "Application" / "Services" / "Payments" / "StripePaymentService.cs"
    if not service.exists():
        return []
    pattern = re.compile(r"Task<[^>]+>\s+(\w+Async)")
    methods = sorted(set(pattern.findall(service.read_text(encoding="utf-8"))))
    return methods


def detect_auth_contexts() -> List[str]:
    contexts_dir = FRONTEND / "contexts"
    contexts = []
    if not contexts_dir.exists():
        return contexts
    for file in contexts_dir.glob("*Context.tsx"):
        contexts.append(file.name.replace(".tsx", ""))
    return sorted(contexts)


def run_git(*args: str) -> str:
    return subprocess.check_output(["git", *args], cwd=ROOT).decode().strip()


def current_git_identifier() -> str:
    try:
        return run_git("rev-parse", "--short", "HEAD")
    except subprocess.CalledProcessError:
        return "0000000"


def build_overview(info: Dict[str, str]) -> str:
    return dedent(
        f"""
        - Frontend: Next.js {info['next']} (App Router) with React {info['react']} and Tailwind CSS v4 via `@tailwindcss/postcss`.
        - Backend: ASP.NET Core 8 Web API with Entity Framework Core and Stripe.NET integration.
        - Tooling: TypeScript {info['typescript']}, ESLint flat config, no default testing harness (payments introduces Vitest).
        - Deployment: Docker compose templates available in `Backend/docker-compose.yml`.
        """
    ).strip()


def build_frontend_architecture(routes: List[str], tokens: List[str], contexts: List[str]) -> str:
    lines: List[str] = ["**Routing**"]
    if routes:
        lines.extend(f"- {route}" for route in routes)
    else:
        lines.append("- (none detected)")

    lines.append("")
    lines.append("**State & Context**")
    if contexts:
        lines.extend(f"- {name}" for name in contexts)
    else:
        lines.append("- (none)")

    lines.append("")
    lines.append(
        f"**Design Tokens (from `app/globals.css` — see `{TAILWIND_DOC.relative_to(ROOT)}`)**"
    )
    if tokens:
        lines.extend(f"- {token}" for token in tokens[:10])
    else:
        lines.append("- (not detected)")

    return "\n".join(lines).strip()


def build_backend_architecture(endpoints: List[str], services: List[str]) -> str:
    lines: List[str] = ["**Controllers**"]
    if endpoints:
        lines.extend(f"- {line}" for line in endpoints)
    else:
        lines.append("- (none)")

    lines.append("")
    lines.append("**Services (`StripePaymentService` methods)**")
    if services:
        lines.extend(f"- {name}" for name in services)
    else:
        lines.append("- (none)")

    return "\n".join(lines).strip()


def build_payments_domain() -> str:
    return dedent(
        """
        ```mermaid
        sequenceDiagram
            participant U as Buyer
            participant FE as Frontend
            participant BE as ASP.NET Core API
            participant ST as Stripe
            U->>FE: Initiate checkout
            FE->>BE: POST /api/payment/checkout-session
            BE->>ST: Create Stripe Checkout Session
            ST-->>BE: Session URL
            BE-->>FE: Redirect URL
            U->>ST: Complete payment + 3DS
            ST-->>BE: Webhook (checkout.session.completed)
            BE->>BE: Update payment status + notify services
            FE->>BE: GET payment status (polling)
        ```

        State machine highlights: `Pending → Processing → Completed` with failure branches (`Failed`, `Refunded`, `Disputed`). Webhooks provide idempotent updates recorded in `WebhookEventLogs`.
        """
    ).strip()


def build_security() -> str:
    return dedent(
        """
        - PCI boundary: only Stripe Elements handles card data; backend stores Stripe IDs and metadata (no PAN).
        - JWT auth protects payment APIs; rate limiting configured via `AspNetCoreRateLimit`.
        - Webhook signatures validated with Stripe secret and configured tolerance.
        - Avoid logging PII; use structured logs via ASP.NET Core `ILogger`.
        """
    ).strip()


def build_test_strategy() -> str:
    return dedent(
        """
        - Unit: Adapter logic and utilities covered by Vitest with SDK mocks.
        - Component: React Testing Library for forms, modals, and stateful flows.
        - Integration: MSW interceptors emulate backend payment endpoints.
        - Backend: Stripe webhook handlers exercised via application service tests (future work).
        """
    ).strip()


def build_ops() -> str:
    return dedent(
        """
        - Observability: ASP.NET Core logging + Hangfire dashboard for jobs.
        - Telemetry: Frontend emits analytics events via payment telemetry service (non-PII).
        - Local reproduction: run backend via `dotnet run` and frontend via `npm run dev` in `Frontend/`.
        """
    ).strip()


def build_conventions() -> str:
    return dedent(
        """
        - Coding style: TypeScript strict mode, React functional components, Tailwind utility classes.
        - Commits: Conventional Commits (e.g., `feat:`, `docs:`).
        - PRs: Provide summary, test plan, security notes, and doc references per payments playbook.
        """
    ).strip()


def load_existing_changelog() -> List[str]:
    if not GUIDE_PATH.exists():
        return []
    text = GUIDE_PATH.read_text(encoding="utf-8")
    if "## Changelog" not in text:
        return []
    return text.split("## Changelog", maxsplit=1)[1].strip().splitlines()


def build_changelog(existing: List[str], *, update: bool) -> str:
    identifier = current_git_identifier()
    timestamp = (
        dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    )
    entry = f"- {identifier} - auto-update at {timestamp}"
    lines = [line for line in existing if line.strip()]
    if update:
        lines = [line for line in lines if not line.startswith(f"- {identifier} ")]
        lines.insert(0, entry)
    return "\n".join(lines)


def render_guide(sections: Dict[str, str], changelog: str) -> str:
    parts = [
        "# System Guide",
        "",
        "## Overview & Stack",
        sections["overview"],
        "",
        "## Frontend Architecture",
        sections["frontend"],
        "",
        "## Backend Architecture",
        sections["backend"],
        "",
        "## Payments Domain",
        sections["payments"],
        "",
        "## Security & Compliance",
        sections["security"],
        "",
        "## Test Strategy",
        sections["tests"],
        "",
        "## Ops & Observability",
        sections["ops"],
        "",
        "## Conventions",
        sections["conventions"],
        "",
        "## Changelog",
        changelog,
    ]
    return "\n".join(parts).strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Update SYSTEM_GUIDE.md")
    parser.add_argument("--check", action="store_true", help="Fail if guide is out-of-date")
    args = parser.parse_args()

    info = collect_next_info()
    routes = list_app_routes()
    tokens = read_tailwind_tokens()
    contexts = detect_auth_contexts()
    endpoints = parse_payment_endpoints()
    services = parse_payment_services()

    sections = {
        "overview": build_overview(info),
        "frontend": build_frontend_architecture(routes, tokens, contexts),
        "backend": build_backend_architecture(endpoints, services),
        "payments": build_payments_domain(),
        "security": build_security(),
        "tests": build_test_strategy(),
        "ops": build_ops(),
        "conventions": build_conventions(),
    }
    changelog = build_changelog(load_existing_changelog(), update=not args.check)
    rendered = render_guide(sections, changelog)

    if args.check:
        existing = GUIDE_PATH.read_text(encoding="utf-8") if GUIDE_PATH.exists() else ""
        if existing != rendered:
            print("SYSTEM_GUIDE.md is out of date. Run npm run docs:update.")
            raise SystemExit(1)
        print("SYSTEM_GUIDE.md is up to date.")
        return

    GUIDE_PATH.write_text(rendered, encoding="utf-8")
    print("SYSTEM_GUIDE.md updated.")


if __name__ == "__main__":
    main()
