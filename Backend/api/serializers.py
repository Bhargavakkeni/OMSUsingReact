from rest_framework import serializers
from .models import OmsAdmin,LoginDetails

'''
Acts as an mediator to convet python object to json and json to python object.
'''

class OrderSerializer(serializers.ModelSerializer):
    class Meta():
        model = OmsAdmin
        fields = ['id','brand','shipMethod','processingDays','processingDaysType','min','max','processingDate','availableToPromiseDate','cutOff','username']


class LoginSerializer(serializers.ModelSerializer):
    class Meta():
        model=LoginDetails
        fields = ['username','password']