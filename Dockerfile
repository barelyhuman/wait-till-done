FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i -g pnpm; pnpm i; pnpm build
CMD ["npm","run","start"]