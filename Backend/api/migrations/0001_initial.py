# Generated by Django 4.2.7 on 2023-12-21 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LoginDetails',
            fields=[
                ('username', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=8)),
            ],
        ),
        migrations.CreateModel(
            name='OmsAdmin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=255)),
                ('shipMethod', models.CharField(max_length=255)),
                ('processingDays', models.IntegerField()),
                ('processingDaysType', models.CharField(max_length=255)),
                ('min', models.IntegerField()),
                ('max', models.IntegerField()),
                ('processingDate', models.DateField()),
                ('availableToPromiseDate', models.DateField()),
                ('cutOff', models.CharField(max_length=255)),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.logindetails')),
            ],
        ),
    ]
