## Run
1. Add necessary system variables (see application.properties).
2. Build the project:
   ```
   mvn clean package -DskipTests -Pprod
   ```
   Note: The -Pprod option is for building the frontend. 
3. Run the application
   ```
   java -jar target/<jar-file-name>
   ```


## For setting up Heroku CLI:
```
git remote add heroku git@heroku.com:<heroku-app-name>.git
```


## For restoring Heroku Database locally:
1. Get the database credentials:
    ```
   heroku config:get DATABASE_URL
   ```
2. Dump the database: 
   ```
   pg_dump --no-owner --no-privileges \
   --host=<replace_me> \
   --port=<replace_me> \
   --username=<replace_me> \
   --password \
   --dbname=<replace_me> \
   > mlist.sql
   ```
3. Import the database: 
   ```
   psql -d mList -f mlist.sql
   ```
## For restoring database in Heroku
1. Dump from Heroku:
   ```
   heroku pg:backups:capture && heroku pg:backups:download
   ```
2. Upload the file to S3:
   ```
   aws s3 cp latest.dump s3://<bucket-name>
   ```   
3. Generate a presign URL for the object:
   ```
   aws s3 presign s3://<bucket-name>/latest.dump
   ```
4. Restore the data in Heroku:
   ```
   heroku pg:backups:restore '<presigned-url>' DATABASE_URL
   ```
5. Remove the object from S3:
   ```
   aws s3 rm s3://<bucket-name>/latest.dump
   ```
Note: Windows command line need double quotes instead of single quotation.