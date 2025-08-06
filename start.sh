#!/bin/sh
set -e

# Tách host và port từ DATABASE_URL
DB_HOST=$(echo "$DATABASE_URL" | sed -E 's#postgres(ql)?://[^@]+@([^:/]+):([0-9]+)/.*#\2#')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's#postgres(ql)?://[^@]+@([^:/]+):([0-9]+)/.*#\3#')

echo "⏳ Waiting for PostgreSQL ($DB_HOST:$DB_PORT)..."

for i in $(seq 1 20); do
  if nc -z "$DB_HOST" "$DB_PORT"; then
    echo "✅ DB is ready!"
    break
  fi
  echo "🔄 Waiting for DB... ($i/20)"
  sleep 1
done

if ! nc -z "$DB_HOST" "$DB_PORT"; then
  echo "❌ PostgreSQL not ready after 20 seconds. Exiting."
  exit 1
fi

echo "📦 Running Prisma Client generation..."
npx prisma generate

echo "📡 Pushing schema to database..."
npm run db:push

echo "🚀 Starting NestJS app..."
npm run start:dev
