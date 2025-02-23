FROM php:8.4-fpm

RUN apt update && apt install -y bash-completion vim

# Allow bash-completion
RUN echo "if [ -f /etc/bash_completion ]; then . /etc/bash_completion; fi" >> /etc/bash.bashrc

# Install support for mariadb
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app

CMD ["php-fpm"]
