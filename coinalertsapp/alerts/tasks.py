import logging

from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from coinalertsapp.celery import app
from django.contrib.auth import get_user_model

from django.conf import settings

from django.template import Template, Context

from .models import Alert

import requests
import json

ALERT_TEMPLATE = """
ALERT! ALERT!
{{ currency }} is now {{ current_value }}
"""
	

@app.task
def send_alert():
	url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD"
	headers = {'X-CoinAPI-Key': '052A029E-B633-4AD7-89D7-3E030A1AEA8D'}
	response = requests.get(url, headers=headers)
	json_data = json.loads(response.text)


	all_currency = {"BTC": json_data["rate"]}


	for user in get_user_model().objects.all():

		alerts = Alert.objects.filter(user=user)
		for alert in alerts:
			currency = alert.currency
			alert_cutoff = alert.cutoff_value
			alert_under = alert.under

			current_value = all_currency.get(alert.currency)

			send = False

			if alert_under:
				if alert_cutoff > current_value:
					send = True
			else:
				if alert_cutoff < current_value:
					send = True

			if send:

				template = Template(ALERT_TEMPLATE)

				send_mail(
					'Alert Activity',
					template.render(context=Context({'currency': currency, 'current_value': current_value})),
					'mycoinapiapp@gmail.com',
					[user.email],
					fail_silently=False,
				)
