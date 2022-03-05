# pull official base image
FROM node:16-alpine3.14

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./ 
COPY package-lock.json ./
RUN npm install -g npm@latest
RUN npm ci
COPY . ./

CMD ["npm", "run", "start"]
