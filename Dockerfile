FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN corepack enable;pnpm install; pnpm run build

EXPOSE 4321

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4321

CMD ["node",".output/server/index.mjs"]