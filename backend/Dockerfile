FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x wait-for-it.sh
EXPOSE 9000
CMD ["npm", "start"]
