FROM node:20
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app/
COPY package*.json ./
COPY . .
RUN rm -rf node_modules
RUN rm -rf build
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]
