FROM node:20.18.0

WORKDIR /app

COPY package*.json ./
RUN npm install

# Cài netcat để chờ DB khởi động
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

RUN npm install -g @nestjs/cli

COPY start.sh .
RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["./start.sh"]
