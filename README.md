# mList



### Run

1. Add system variables to accommodate  `application.properties`.
2. Run `mvn clean package -DskipTests` with option `-Pprod` to repackage frontend otherwise omit this option.
3. Run `java -jar target/<jar-file-name>`



### **PostgreSQL Backup**

**Required:** Local PostgreSQL version must match Heroku's.

**Export:**

```term
heroku pg:backups:capture

heroku pg:backups:download

pg_restore --verbose --clean --no-acl --no-owner -h localhost -P 5432 -U postgres -d mList latest.dump
```

**Import:**

```
aws s3 cp latest.dump s3://<bucket-name>

aws s3 presign s3://<bucket-name>/latest.dump

heroku pg:backups:restore "<presigned-s3-url>" DATABASE_URL

aws s3 rm s3://<bucket-name>/latest.dump
```

Note: Windows command line need double quotes instead of single quotation.