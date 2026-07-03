#!/usr/bin/env bash
# ============================================================
# Tera-Tech Segment 1 — Project Init Script
# Run from: /home/tita-tera-official/dev/@teratechcompany.tech/
# ============================================================
set -e

PROJECT="teratechcompany"
BASE_DIR="/home/tita-tera-official/dev/@teratechcompany.tech"

echo "→ Creating Next.js project..."
cd "$BASE_DIR"
npx create-next-app@14.2.5 "$PROJECT" \
  --typescript \
  --no-tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint \
  --no-turbo

cd "$PROJECT"

echo "→ Installing dependencies..."
npm install \
  next-auth@4.24.7 \
  mongoose@8.4.4 \
  bcryptjs@2.4.3 \
  zod@3.23.8 \
  resend@3.4.0 \
  isomorphic-dompurify@2.15.0 \
  slugify@1.6.6 \
  sharp@0.33.4 \
  jose@5.6.3 \
  clsx@2.1.1 \
  react-hook-form@7.52.1 \
  @hookform/resolvers@3.9.0

npm install -D \
  @types/bcryptjs@2.4.6 \
  @types/node@20 \
  typescript@5

echo "→ Git setup..."
git init
git add -A
git commit -m "chore: initial Next.js scaffold"

echo ""
echo "✓ Done. Next steps:"
echo "  1. Create GitHub repo: https://github.com/new"
echo "  2. git remote add origin git@github.com:YOUR_ORG/teratechcompany.git"
echo "  3. git push -u origin main"
echo "  4. Copy all generated files from this segment into the project"
echo "  5. npm run dev"
