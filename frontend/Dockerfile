FROM node:19-alpine3.16

COPY . /app

WORKDIR /app

RUN npm ci

EXPOSE 3000 

CMD ["npm", "run", "start"]
