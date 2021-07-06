FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN chown -R app /opt/app
RUN chmod +x entrypoint.sh
USER app
EXPOSE 3000
ENTRYPOINT [ "sh", "entrypoint.sh" ]