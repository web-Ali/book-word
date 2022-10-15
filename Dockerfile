FROM mhart/alpine-node:latest
RUN yarn global add serve
WORKDIR /react
COPY build .
CMD serve -s .
