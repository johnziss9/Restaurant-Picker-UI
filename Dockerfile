# FROM node:10.19.0-alpine as build

# WORKDIR /app

# COPY . /app/

# RUN npm run build

# FROM nginx:1.16.0-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# CMD ["nginx", "-g", "deamon off;"]



FROM node:10.19.0-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf