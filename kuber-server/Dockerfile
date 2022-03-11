FROM node:16.14.0
ENV PORT=3000
WORKDIR /kuber-server/dist
COPY ./dist ./
COPY ./package.json ./package.json
RUN npm install --only=prod
EXPOSE ${PORT}
CMD ["node", "server.js"]