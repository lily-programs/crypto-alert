from django.contrib.auth.models import User
from rest_framework import serializers
from alerts.models import Alert

class AlertUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'email')

class AlertSerializer(serializers.ModelSerializer):
	user = AlertUserSerializer(read_only=True)

	class Meta:
		model = Alert
		fields = ('user', 'id', 'date_created', 'currency', 'under', 'cutoff_value')