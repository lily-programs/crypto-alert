from __future__ import absolute_import
import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coinalertsapp.settings')

app = Celery('coinalertsapp')
app.config_from_object('django.conf:settings')

#Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
	'send-alert-every-hour': {
		'task': 'alerts.tasks.send_alert',
		'schedule': crontab(hour="*", minute=1),
	}
}
