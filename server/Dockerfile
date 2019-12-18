FROM node:12

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

#RUN apk --no-cache add --virtual builds-deps build-base python

#RUN apk add --update nodejs npm

RUN npm install
RUN npm install -g nodemon

CMD ["nodemon"]