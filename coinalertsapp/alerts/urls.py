from django.urls import path
from alerts.views import AlertListCreateAPIView, AlertDetailAPIView

app_name = 'alerts'

urlpatterns = [
	path('', AlertListCreateAPIView.as_view(), name="list"),
	path('<int:pk>/', AlertDetailAPIView.as_view(), name='detail'),
]