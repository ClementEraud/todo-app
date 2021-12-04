# Todo App

Simple Todo app to try Docker, CircleCI, Scaleway, Clean Architecture and more

## How to run project on local machine

To launch the project on local machine use docker-compose.

```sh
docker-compose up -d
```

### Administrate DB

There is an adminer image on docker-compose so you can manage DB by going to:

```
localhost:8080
```

## Deployment

This app is deployed using CircleCi to deploy it to Scaleway on [clementeraud.site](clementeraud.site).

It uses the docker-compose.prod.yml.

## Things that need to be put in an Ansible file

### SSH

SSH configuration for maximum sessions -> See [here](https://linuxhint.com/ssh-maxsessions-configuration/)

### Certificates

Request certificates

```sh
certbot certonly --webroot -w /var/www/certbot --agree-tos --email clement.eraud@gmail.com -n -v -d clementeraud.site -d www.clementeraud.site --debug-challenges
```

Certbot automatically adds a cron job to renew certificates.
