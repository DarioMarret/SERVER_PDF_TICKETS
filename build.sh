export SHORT_COMMIT=$(git log -1 --pretty="%H" | cut -b -8)
export DOCKER_IMAGE_VERSION="dev_${SHORT_COMMIT}"

docker build -t MS:${DOCKER_IMAGE_VERSION} -f Dockerfile .
docker tag MS:${DOCKER_IMAGE_VERSION} MS:latest
docker push MS:${DOCKER_IMAGE_VERSION}
docker push MS:latest
echo "tag: ${DOCKER_IMAGE_VERSION}"