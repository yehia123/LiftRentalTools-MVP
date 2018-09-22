# Error that im stuck at when deploying
# keep getting ''
# Empty reply from server
# Connection #0 to host localhost left intact
# curl: (52) Empty reply from server
# Build new docker image:
#
#   docker build -t frontend:1 .
#
# Tag image for AWS ECR:
#
#    docker tag frontend:1 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#
# Upload ("push") newly built docker image to AWS ECR:
#
#   008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#
# Run docker container:
#
#   docker run -it -p 4200:4200 --restart=always 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools:latest
#

# Create img from official node 6 image from dockerhub
FROM node:10

# Create a directory will the app will places
RUN mkdir -p /src/app

# Change directory so that our command run inside the new directory
WORKDIR /src/app

# Copy dependency definitions
#COPY package.json /app

# the code needed to run the app
COPY . /src/app

# Install dependecies
RUN npm install



ENTRYPOINT ["npm", "start"]


# Export the port the app runs in
EXPOSE 4200



