FROM node:19-alpine3.16

COPY . /app 

WORKDIR /app 

RUN npm ci 

RUN npm i --save-dev @types/jsonwebtoken

# RUN npx prisma db push 

# RUN npx prisma db seed

EXPOSE 8000 

ENTRYPOINT [ "npm", "run", "dev" ]


