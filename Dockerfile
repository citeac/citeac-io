#
# Node.js Dockerfile
#
#

# Pull base image.
FROM dockerfile/nodejs

# Expose port
EXPOSE 8080

# Add source
ADD . /src

# Set Working directory
WORKDIR /src

# install deps
RUN npm install

# run supervisord
CMD ["node", "server.js"]