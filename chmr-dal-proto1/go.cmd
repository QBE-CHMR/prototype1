docker build --no-cache --pull -t chmr-dal-proto1 .
docker run --rm --name dal --network mynet chmr-dal-proto1