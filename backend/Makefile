VERSION	?= $(shell git rev-parse HEAD)
IMAGE	?= 008464082942.dkr.ecr.us-west-1.amazonaws.com/liftrentaltools-repo:$(VERSION)

all: login build push deploy

login:

    $(aws ecr get-login --no-include-email)

build:

	docker build -t $(IMAGE) .

push:

	docker push $(IMAGE)

deploy:

	ssh -i /Users/yehiaqtaish/Downloads/newpair.pem centos@54.176.247.200 'sudo docker rm -f web || true'
	ssh -i /Users/yehiaqtaish/Downloads/newpair.pem centos@54.176.247.200 'sudo docker run -v images:/app/images -d -p 3000:3000 --restart=always --name=web $(IMAGE)'
