#!/bin/sh
set -e

# Chọn host dựa vào biến môi trường
DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

echo "⏳ Waiting for PostgreSQL ($DB_HOST:$DB_PORT)..."

for i in $(seq 1 20); do
  if nc -z $DB_HOST $DB_PORT; then
    echo "✅ DB is ready!"
    break
  fi
  echo "🔄 Waiting for DB... ($i/20)"
  sleep 1
done

if ! nc -z $DB_HOST $DB_PORT; then
  echo "❌ PostgreSQL not ready after 20 seconds. Exiting."
  exit 1
fi

echo "📦 Running Prisma Client generation..."
npx prisma generate

echo "📡 Pushing schema to database..."
npm run db:push

echo "🚀 Starting NestJS app..."
npm run start:dev
