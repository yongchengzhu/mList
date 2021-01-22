# mList



## Run

1. Add system variables to accommodate  `application.properties`.
2. Run `mvn clean package -DskipTests` with option `-Pprod` to repackage frontend otherwise omit this option.
3. Run `java -jar target/<jar-file-name>`



## **PostgreSQL Backup**

**Required:** Local PostgreSQL version must match Heroku's.



**Export:**

```term
heroku pg:backups:capture

heroku pg:backups:download
```



**Import:**

Local

```
pg_restore --host "localhost" --port "5432" --username "postgres" --dbname "mlist" --verbose "latest.dump"
```

Heroku

```
aws s3 cp latest.dump s3://<bucket-name>

aws s3 presign s3://<bucket-name>/latest.dump

heroku pg:backups:restore "<presigned-s3-url>" DATABASE_URL

aws s3 rm s3://<bucket-name>/latest.dump
```

Note: Windows command line need double quotes instead of single quotation.