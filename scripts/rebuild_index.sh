#!/usr/bin/env bash
set -euo pipefail
OUT="TUTORIALS.md"
cat > "$OUT" <<'EOF'
# Tutorials Index

Generated list of tutorials by category.

EOF
for cat in payload nextjs tailwind; do
  if [[ -d "$cat" ]]; then
    echo "## ${cat^}" >> "$OUT"
    for d in "$cat"/*/; do
      [[ -d "$d" ]] || continue
      name="${d%/}"
      echo "- [$name]($name)" >> "$OUT"
    done
    echo >> "$OUT"
  fi
done
git add "$OUT"
echo "Wrote $OUT (remember to commit)."
