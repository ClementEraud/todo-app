#!/bin/sh
rsa_key_size=4096

chmod -R +w /etc/nginx/
mkdir -p /etc/nginx/ssl/live/www.clementeraud.site/
mkdir -p /etc/nginx/ssl/live/clementeraud.site/
chmod -R +w /etc/nginx/ssl/live/

FILE=/etc/nginx/ssl/live/www.clementeraud.site/privkey.pem
if test -f "$FILE"; then

  echo "### Starting nginx ..."
    nginx -g 'daemon off;'
  echo

else 

  echo "### Creating dummy certificate for www.clementeraud.site ..."
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 -keyout '/etc/nginx/ssl/live/www.clementeraud.site/privkey.pem' -out '/etc/nginx/ssl/live/www.clementeraud.site/fullchain.pem' -subj '/CN=localhost'
  echo
  echo "### Creating dummy certificate for clementeraud.site ..."
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 -keyout '/etc/nginx/ssl/live/clementeraud.site/privkey.pem' -out '/etc/nginx/ssl/live/clementeraud.site/fullchain.pem' -subj '/CN=localhost'
  echo

  echo "### Starting nginx ..."
  nginx -g 'daemon on;'
  echo

  echo "### Deleting dummy certificate for www.clementeraud.site ..."
    rm -Rf /etc/nginx/ssl/live/www.clementeraud.site && \
    rm -Rf /etc/nginx/ssl/archive/www.clementeraud.site && \
    rm -Rf /etc/nginx/ssl/renewal/www.clementeraud.site.conf
  echo

  echo "### Deleting dummy certificate for clementeraud.site ..."
    rm -Rf /etc/nginx/ssl/live/clementeraud.site && \
    rm -Rf /etc/nginx/ssl/archive/clementeraud.site && \
    rm -Rf /etc/nginx/ssl/renewal/clementeraud.site.conf
  echo

  echo "tail logs" 
  tail -F /var/log/nginx/access.log
  echo

fi
