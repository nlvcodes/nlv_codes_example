#!/usr/bin/env bash
set -euo pipefail
# Usage: bash scripts/import_tutorial_subtree.sh <repo_url> [branch] [category] [folder]
REPO_URL="${1:-}" ; BRANCH="${2:-main}" ; CATEGORY="${3:-payload}" ; FOLDER_IN_CAT="${4:-}"
if [[ -z "$REPO_URL" ]]; then echo "Error: repo_url required"; exit 1; fi
if [[ ! "$CATEGORY" =~ ^(payload|nextjs|tailwind)$ ]]; then echo "Error: category must be payload|nextjs|tailwind"; exit 1; fi
if [[ -z "$FOLDER_IN_CAT" ]]; then
  base="$(basename "${REPO_URL%.*}")"
  FOLDER_IN_CAT="$(echo "$base" | tr -cs '[:alnum:]' '_' )_tutorial"
fi
cd "$(git rev-parse --show-toplevel)"
mkdir -p "$CATEGORY"
TARGET_PREFIX="$CATEGORY/$FOLDER_IN_CAT"
[[ -e "$TARGET_PREFIX" ]] && { echo "Error: '$TARGET_PREFIX' exists"; exit 1; }
remote_name="st_$(echo "${CATEGORY}_${FOLDER_IN_CAT}" | tr -cs '[:alnum:]' '_' )"
git remote get-url "$remote_name" >/dev/null 2>&1 || git remote add "$remote_name" "$REPO_URL"
git fetch "$remote_name" --tags
git subtree add --prefix="$TARGET_PREFIX" "$remote_name" "$BRANCH" -m "subtree: add $REPO_URL into $TARGET_PREFIX"
echo
echo "✅ Imported into $TARGET_PREFIX (remote: $remote_name)"
echo "Pull updates: git subtree pull --prefix=\"$TARGET_PREFIX\" \"$remote_name\" \"$BRANCH\""
echo "Push back:   git subtree push --prefix=\"$TARGET_PREFIX\" \"$remote_name\" \"$BRANCH\""
