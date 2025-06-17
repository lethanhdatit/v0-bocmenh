FROM node:22-alpine

WORKDIR /app

ARG FE_PORT=9500
ENV FE_PORT=${FE_PORT:-9500}
ENV PORT=${FE_PORT}

EXPOSE ${FE_PORT}

RUN mkdir temp

WORKDIR /app/temp

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN ls -la

RUN npm run build

RUN mkdir -p .next/standalone \
    && cp -r public .next/standalone/ \
    && cp -r .next/static .next/standalone/.next/ \
    && cp .env .next/standalone/ \
    && cp .env .next/standalone/.next/

RUN cp -r .next/standalone/. /app

WORKDIR /app

RUN rm -rf temp

RUN ls -la

RUN ls -la ./.next

RUN npm install pm2 -g

CMD ["pm2", "start", "server.js", "--name", "bocmenh", "--watch", "--no-daemon"]
