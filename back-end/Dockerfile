FROM node:12-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./ 
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD ["node", "dist/main.js"]
