FROM nginx:latest
COPY nginx.conf /etc/nginx/
RUN nginx -v
RUN nginx -c /etc/nginx/nginx.conf -t
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
