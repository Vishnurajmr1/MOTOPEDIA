# Node server
FROM node:20-alpine
WORKDIR /src
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]



