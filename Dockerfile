FROM node:18-alpine
WORKDIR /app

COPY . .

ENV ADMIN_PASSWORD="Demo@123"

RUN npm i -g pnpm; pnpm i; pnpm build

ENV NODE_ENV="production"
ENV PORT=3000

EXPOSE 3000

CMD ["npm","run","docker:start"]