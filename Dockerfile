FROM php:8.2-apache

#############################
# Install PHP extensions    #
#############################

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install \
    intl \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    pgsql \
    zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

#########################
# Apache                #
#########################
RUN a2enmod rewrite
RUN service apache2 restart


#########################
# Composer              #
#########################

# install composer
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Execute composer install
#RUN composer install

#########################
# Node                  #
#########################

# Node install
#RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Node install
#RUN apt-get install -y nodejs

#####################
# Expose port 80    #
#####################

EXPOSE 80


