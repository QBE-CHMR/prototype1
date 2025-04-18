docker build --no-cache --pull -t chmr-dal-proto1 .
docker run --rm --name chmr-dal-proto1 --network mynet chmr-dal-proto1