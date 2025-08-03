#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL (db:5432)..."

for i in $(seq 1 20); do
  if nc -z db 5432; then
    echo "✅ DB is ready!"
    break
  fi
  echo "🔄 Waiting for DB... ($i/20)"
  sleep 1
done

if ! nc -z db 5432; then
  echo "❌ PostgreSQL not ready after 20 seconds. Exiting."
  exit 1
fi

echo "📦 Running Prisma Client generation..."
npx prisma generate

echo "📡 Pushing schema to database..."
npm run db:push

echo "🚀 Starting NestJS app..."
npm run start:dev
