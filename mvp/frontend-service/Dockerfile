FROM node:18-slim as base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=8080
ENV PORT=${PORT}
EXPOSE ${PORT}
ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT
ARG VITE_BACKEND_HOST
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST
ARG VITE_BACKEND_PORT
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT
RUN npm i npm@latest -g
USER node
WORKDIR /opt/node_app/app
COPY --chown=node:node . .
ENV PATH /opt/node_app/node_modules/.bin:$PATH

FROM base as non-prod
ARG NODE_ENV=non-prod
ENV NODE_ENV=${NODE_ENV}
RUN npm ci && npm cache clean --force && mv node_modules ../ && mkdir node_modules 

FROM non-prod as dev
EXPOSE 9229 9230
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
CMD ["npm", "run", "dev"]

FROM non-prod as test
ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}
RUN npm run lint
RUN npm run format:check
CMD ["npm", "run", "test"] 


FROM base as build
RUN npm ci --ignore-scripts && mv node_modules ../ && mkdir node_modules 
RUN ["npm", "build"]

FROM nginx
COPY --from=build /dist /usr/share/nginx/html
