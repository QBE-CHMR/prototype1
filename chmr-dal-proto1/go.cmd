docker build --no-cache --pull -t chmr-dal-proto1 .
docker run --rm --name chmr-dal-proto1 -p 2000:2000 --network mynet chmr-dal-proto1