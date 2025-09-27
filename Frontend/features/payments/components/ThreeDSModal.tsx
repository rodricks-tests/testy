"use client";

import { ReactNode } from "react";

interface ThreeDSModalProps {
  open: boolean;
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export function ThreeDSModal({ open, title, description, footer }: ThreeDSModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "threeds-title" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
        {title ? (
          <h2 id="threeds-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
        {footer ? <div className="mt-4 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

// Modal semantics follow React/28-accessibility.md recommendations.
