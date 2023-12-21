from rest_framework import serializers
from .models import OmsAdmin,LoginDetails


class OrderSerializer(serializers.ModelSerializer):
    class Meta():
        model = OmsAdmin
        fields = ['id','brand','shipMethod','processingDays','processingDaysType','min','max','processingDate','availableToPromiseDate','cutOff','username']


class LoginSerializer(serializers.ModelSerializer):
    class Meta():
        model=LoginDetails
        fields = ['username','password']