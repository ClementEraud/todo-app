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

## Server configuration

Server configuration is managed by Ansible under `ansible/setup.yml`.
You will need ansible installed and hosts configured for your server.

Then run :

```sh
ansible-playbook ansible/setup.yml
```

## SSL Certificates

In order to pass challenges of let's encrypt, we need a running web server, that is why the web service in the [Dockerfile](./front-end/Dockerfile) it is set to start using this [endpoint](./front-end/endpoint.sh).

So before launching the certification playbook, you will need to have setup your server and deployed the app with [circle ci](https://app.circleci.com)

This endpoint makes sure that if there is no certificates, then it creates dummy certificates, so the web server can run and the challenges for let's encrypt certificates can pass. After that Certbot will place the files in a shared directory with the Front-End container, and then the playbook will reload nginx with the new certificates.

This project is using certbot to handle SSL Certificates.
It is managed by Ansible.

Run :

```sh
ansible-playbook ansible/certificates.yml
```

This makes sure certbot is installed and then get certificates.
Certbot creates a cron-job to handle renewal of certificates so you should not have to run certificates.yml playbook twice.
