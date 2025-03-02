FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

RUN SKIP_ENV_VALIDATION=true pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]