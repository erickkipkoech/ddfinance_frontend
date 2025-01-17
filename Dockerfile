# Step 1: Build the Angular app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Step 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/dist/ddfinance_frontend /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
