# Generated by Django 5.0 on 2024-01-11 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NovelAPI', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='novel',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
