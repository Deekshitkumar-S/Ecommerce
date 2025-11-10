FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./
RUN npm ci || yarn --frozen-lockfile || pnpm i --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package.json ./
RUN npm pkg delete scripts.prepare scripts.postinstall || true
RUN npm i --omit=dev --ignore-scripts
EXPOSE 5000
CMD ["node", "dist/server.js"]

