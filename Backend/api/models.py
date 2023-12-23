from django.db import models

# Create your models here.

'''
Creates tables in database using ORM(Object Relational Mapping)
'''

class LoginDetails(models.Model):
    username = models.CharField(max_length=255,primary_key=True) #creates a column in database
    password = models.CharField(max_length=8)

class OmsAdmin(models.Model):
    brand=models.CharField(max_length=255)
    shipMethod=models.CharField(max_length=255)
    processingDays=models.IntegerField()
    processingDaysType=models.CharField(max_length=255)
    min=models.IntegerField()
    max=models.IntegerField()
    processingDate=models.DateField()
    availableToPromiseDate=models.DateField()
    cutOff=models.CharField(max_length=255)
    username=models.ForeignKey(LoginDetails,on_delete=models.CASCADE) #establishes one to many relation for every username we can have multiple orders.

