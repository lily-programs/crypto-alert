from django.contrib import admin
from alerts.models import Alert

# Register your models here.
class AlertAdmin(admin.ModelAdmin):
	list_display = ("user", "date_created", "currency", "under", "cutoff_value")
	list_filter = ("currency", "date_created")

admin.site.register(Alert, AlertAdmin)