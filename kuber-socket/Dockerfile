FROM node:16.14.0
ENV PORT=3001
WORKDIR /kuber-socket/dist
COPY ./dist ./
COPY ./package.json ./package.json
RUN npm install --only=prod
EXPOSE ${PORT}
CMD ["node", "index.js"]