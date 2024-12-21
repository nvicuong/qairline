FROM mysql:8.0

ENV MYSQL_DATABASE=Qairline

COPY db.sql /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
    CMD mysqladmin ping -h localhost --silent || exit 1

CMD ["mysqld"]
