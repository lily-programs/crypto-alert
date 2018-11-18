from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from alerts.models import Alert
from alerts.permissions import UserIsOwnerAlert
from alerts.serializers import AlertSerializer

# Create your views here.
class AlertListCreateAPIView(ListCreateAPIView):
	
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated, UserIsOwnerAlert)
	serializer_class = AlertSerializer

	def get_queryset(self):
		return Alert.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class AlertDetailAPIView(RetrieveUpdateDestroyAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated, UserIsOwnerAlert)
	serializer_class = AlertSerializer
	queryset = Alert.objects.all()
