FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["nodemon","server.js"]

# CMD ["node","server.js","dev"]

# CMD ["npm", "run", "dev"]

# CMD ["tail", "-f", "/dev/null"]