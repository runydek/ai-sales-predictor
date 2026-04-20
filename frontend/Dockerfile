FROM node:20-alpine

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --legacy-peer-deps

ARG REACT_APP_API_URL=http://localhost:8001
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY frontend/ .

EXPOSE 3000
CMD ["npm", "start"]
