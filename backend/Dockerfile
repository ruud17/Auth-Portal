FROM node:16-alpine as build
WORKDIR /app
RUN apk add --no-cache bash
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x wait-for-it.sh
EXPOSE 9000

CMD ["npm", "start"]
