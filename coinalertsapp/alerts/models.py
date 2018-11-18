from django.db import models
from django.conf import settings
from django.utils.encoding import smart_text as smart_unicode
from django.utils.translation import ugettext_lazy as _
#from alerts.tasks import send_verification_email
from django.contrib.auth import get_user_model

from django.db.models import signals
from django.core.mail import send_mail

# Create your models here.

def validate_number(value):
	if value < 0:
		raise ValidationError('cutoff cannot be a negative value')


class Alert(models.Model):
	user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
	currency = models.CharField(_("Currency"), max_length=5)
	date_created = models.DateTimeField(_("Date Created"), auto_now_add=True)
	under = models.BooleanField(_("Under"), default=True)
	cutoff_value = models.IntegerField(_("Cutoff Value"), validators=[validate_number])

	class Meta:
		verbose_name = _("Alert")
		verbose_name_plural = _("Alerts")

	def __unicode__(self):
		return smart_unicode(self.name)

