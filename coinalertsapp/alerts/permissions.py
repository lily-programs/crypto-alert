from rest_framework.permissions import BasePermission

class UserIsOwnerAlert(BasePermission):

	def has_object_permission(self, request, view, alert):
		return request.user.id == alert.user.id