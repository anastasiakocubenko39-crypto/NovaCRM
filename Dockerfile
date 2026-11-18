FROM node:20-alpine
WORKDIR /app
COPY . .
ENV PORT=8080 DATA_DIR=/data
VOLUME ["/data"]
EXPOSE 8080
USER node
CMD ["node", "server/server.js"]
