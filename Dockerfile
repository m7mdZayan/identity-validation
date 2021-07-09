FROM node:alpine

ADD . /usr/src/react-app

WORKDIR /usr/src/react-app

RUN npm install

RUN npm run build


EXPOSE 3001

CMD npm start

