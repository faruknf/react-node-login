FROM node:14-alpine3.14 AS client_production
WORKDIR /client
COPY ./client/package.json .
COPY ./client/package-lock.json .
RUN npm install
COPY ./client .
RUN npm run build


FROM node:14-alpine3.14 AS production
WORKDIR /app
COPY ./server/package.json .
COPY ./server/package-lock.json .
RUN npm install
COPY ./server .
COPY --from=client_production /client/build /app/build
CMD ["npm","start"]
