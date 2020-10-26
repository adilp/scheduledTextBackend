FROM node:latest
COPY default.conf /etc/apache2/sites-enabled/000-default.conf
WORKDIR /var/www/app
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

CMD npm install -g 
EXPOSE 3000