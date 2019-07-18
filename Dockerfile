FROM node:8.12.0
COPY * app/
WORKDIR app/
ENTRYPOINT ["/app/entrypoint.sh"]

