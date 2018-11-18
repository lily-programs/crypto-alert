from django.urls import path
from users.views import UserRegistrationAPIView, UserChangeEmailAPIView, UserDeletionAPIView, UserInfoAPIView, UserLoginAPIView
from users.views import UserLogoutAPIView

urlpatterns = [
	path('users/register', UserRegistrationAPIView.as_view()),
	path('users/<int:pk>/change_email', UserChangeEmailAPIView.as_view(), name='change email'),
	path('users/<int:pk>/delete', UserDeletionAPIView.as_view(), name='delete user'),
	path("users/<int:pk>/info", UserInfoAPIView.as_view(), name="user info"),
	path("users/login", UserLoginAPIView.as_view(), name="user login"),
	path("users/logout", UserLogoutAPIView.as_view(), name="user logout")
]