# 📝 Notes API - NestJS Backend

A simple RESTful API for managing notes, built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).
The application help CRUD Note, Tags management, and has Authentication

## 🚀 Features

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Swagger UI for API documentation
- ✅ Modular architecture with NestJS best practices
- ✅ `.env` support for environment variables
- ✅ Throw prisma Exception in Prisma document
- ✅ Authentication

---

## 📦 Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [Express](https://expressjs.com/)
- [Class-validator](https://github.com/typestack/class-validator)
- [Prisma](https://www.prisma.io/)
- [Railway](https://railway.com)
---

## Project Structure
src/
├── common/
    ├── base/            # Base service, for logger service and throw common exception
    ├── context/         # Prisma service for logging prisma status. Request context service are generate requestId for checking log at moment
    ├── decorator/       # Custom business annotations  
    ├── error/           # List mapping errors
    ├── filter/          # Throw Http and Prisma Errors
    ├── interceptor/     # Response mapping 
    ├── middleware/      # Checking request header
    ├── pipe/            # Format request before execute function in service
    common.module.ts
├── entity/              # Mapping with prisma (not yet)
├── modules/             # Feature 
    ├── auth/            # Authenticate for all service
    ├── notes/           # CRUD note service
    ├── tags/            # CRUD tags service
    ├── tags-note/       # has tags todo 
    ├── users/           # Register App
├── test/                # Auto run script test
---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/notes-api.git
cd notes-api

# Install dependencies
npm install

# Create file .env
API_KEY=your_api_key
DATABASE_NAME=your_database_name
DATABASE_PASSWORD=your_database_password
DATABASE_URL=your_database_url
DATABASE_USERNAME=
JWT_SECRET=
NODE_ENV=
REFRESH_SECRET=

# Run in dev mode
npm run start:dev

# Prisma Setup in NestJS
npm run db:init (generate prisma)

# Run db prisma
npm run db:push (npx prisma db push)

# Run application
npm start (nest start)

MIT License © 2025 http://github.com/@minhbui1510
