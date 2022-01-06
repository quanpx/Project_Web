FROM node:14-alpine


WORKDIR /app

COPY package*.json ./

COPY package-lock.json ./

RUN npm install

RUN npm install react-scripts --save

COPY . .

EXPOSE 3000

CMD ["npm","start"]