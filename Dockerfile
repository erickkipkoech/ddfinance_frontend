# Use an official Nginx image to serve the Angular app
FROM nginx:alpine
# Copy the Angular app's build to the Nginx container
COPY ./dist/angular-dashboard /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
