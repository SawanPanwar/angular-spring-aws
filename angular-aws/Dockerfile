# Use the official Nginx image as a base image
FROM nginx:alpine

# Copy the built Angular application into the Nginx container
COPY /dist /usr/share/nginx/html

# Copy the env.js file to the correct location
COPY /src/assets/env.js /usr/share/nginx/html/assets/env.js

# Copy the entrypoint script to the container
COPY docker-entrypoint.sh /usr/share/nginx/html/

# Verify the file is there
RUN ls -l /usr/share/nginx/html/

# Copy the entrypoint script and set executable permissions
RUN chmod +x /usr/share/nginx/html/docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Set the entrypoint to the custom script
ENTRYPOINT ["/usr/share/nginx/html/docker-entrypoint.sh"]

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]