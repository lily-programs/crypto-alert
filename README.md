# crypto-alert

### The purpose of this app is to notify registered users of changes to the price of BTC. ###

#### To run the app locally, first run the django server: ####
```
cd coinalertsapp 
python manage.py runserver 
```

#### In another terminal, navigate to the frontend directory and execute ####
```
npm start
```

#### Navigate into the innermost coinalertsapp folder and start the redis server and celery worker ####
```
redis-server
celery -A coinalertsapp worker -l info
celery -A coinalertsapp beat -l info
```

##### TO-DO ####
* add functionality to track BTC in currencies other than USD
* add functionality to track BTC for a specified time period
* add check so that user is notified only once
* add ability to track other currencies?

