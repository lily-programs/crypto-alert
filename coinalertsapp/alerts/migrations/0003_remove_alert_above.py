# Generated by Django 2.1.3 on 2018-11-11 23:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alerts', '0002_alert_above'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alert',
            name='above',
        ),
    ]
