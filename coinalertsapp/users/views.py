from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, GenericAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView, RetrieveDestroyAPIView
from rest_framework.response import Response
from users.serializers import UserRegistrationSerializer, UserChangeEmailSerializer, UserDeletionSerializer, UserInfoSerializer, UserLoginSerializer
from users.serializers import TokenSerializer
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import login
from django.shortcuts import redirect
from django.http import HttpResponseRedirect

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .permissions import IsUser

class UserRegistrationAPIView(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = serializer.instance
        token, created = Token.objects.get_or_create(user=user)
        data = serializer.data
        data["token"] = token.key
        headers = self.get_success_headers(serializer.data)
        res = Response(data, status=status.HTTP_201_CREATED, headers=headers)
        return res

class UserChangeEmailAPIView(UpdateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsUser, IsAuthenticated)
	queryset = User.objects.all()
	serializer_class = UserChangeEmailSerializer

class UserDeletionAPIView(DestroyAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsUser, IsAuthenticated)
	queryset = User.objects.all()
	serializer_class = UserDeletionSerializer

class UserInfoAPIView(RetrieveAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsUser, IsAuthenticated)
	queryset = User.objects.all()
	serializer_class = UserInfoSerializer

class UserLoginAPIView(GenericAPIView):
	authentication_classes = ()
	permission_classes = ()
	serializer_class = UserLoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			user = serializer.user
			token, _ = Token.objects.get_or_create(user=user)
			login(request, user)
			data = {}
			data['auth_token'] = TokenSerializer(token).data["auth_token"]
			data['user'] = request.user.id
			return Response(
				data,
				status=status.HTTP_200_OK
			)

		else:
			return Response(
				data=serializer.errors,
				status=status.HTTP_400_BAD_REQUEST
			)

class UserLogoutAPIView(GenericAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsUser, IsAuthenticated)

	def post(self, request):
		return self.logout()

	def logout(self, request):
		request.user.auth_token.delete()

		return Response({"success": _("Successfully logged out.")},
				status=status.HTTP_200_OK)

