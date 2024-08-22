
FROM node:16

WORKDIR /usr/src/app

COPY . /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) first.
COPY package*.json ./

# Install dependencies.
# RUN npm install
RUN npm uninstall -g @angular/cli@7.3.10
RUN npm install -g @angular/cli@7.3.10 --legacy-peer-deps
RUN npm install --legacy-peer-deps



# Expose the port the app runs on.
EXPOSE 4200


CMD ["ng", "serve", "--host", "0.0.0.0"]
