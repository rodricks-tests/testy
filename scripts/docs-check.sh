#!/bin/sh
set -euo pipefail
python "$(dirname "$0")/update-system-guide.py" --check
