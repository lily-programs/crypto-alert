from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.hashers import make_password

from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True)

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data['password'])
		return super(UserRegistrationSerializer, self).create(validated_data)

class UserChangeEmailSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('email', )

	def update(self, instance,  validated_data):
		return super(UserChangeEmailSerializer, self).update(instance, validated_data)

class UserDeletionSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username')

	def delete(self, validated_data):
		return super(UserDeletionSerializer, self).delete(validated_data)

class UserInfoSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username', 'email')

	def get(self, validated_data):
		return super(UserInfoSerializer, self).get(validated_data)

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField(required=True)
	password = serializers.CharField(required=True)

	default_error_messages = {
		'inactive_account': _('User account is disabled.'),
		'invalid_credentials': _('Unable to login with provided credentials.')
	}

	def __init__(self, *args, **kwargs):
		super(UserLoginSerializer, self).__init__(*args, **kwargs)
		self.user = None

	def validate(self, attrs):
		self.user = authenticate(username=attrs.get("username"), password=attrs.get('password'))
		if self.user:
			return attrs
		else:
			raise serializers.ValidationError(self.error_messages['invalid_credentials'])

class TokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source='key')

    class Meta:
        model = Token
        fields = ("auth_token",)
