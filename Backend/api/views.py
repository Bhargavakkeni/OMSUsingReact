from django.shortcuts import render,get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OmsAdmin,LoginDetails
from .serializers import OrderSerializer,LoginSerializer


# Create your views here.

@api_view(['GET','POST','PUT','DELETE'])
def get_orders(request,id='',format=''):

    if id!='' and request.method!='POST':
        try:
            order = OmsAdmin.objects.all().get(pk=id)
            check=True
        except:
            try:
                #print(id)
                #here id contains username
                order = OmsAdmin.objects.filter(username=id)
                #print(order)
                if order:
                    check=False
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        '''
        if id is null send all orders.
        '''
        if id=='':
            orders = OmsAdmin.objects.all()
            serializer = OrderSerializer(orders,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        #if id is not null check whether given id is pk or username if it's username execute if block.
        elif  id!='':
            if check == False:
                serializer = OrderSerializer(order,many=True)
            else:
                serializer = OrderSerializer(order)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
    elif request.method == 'POST':
        print(request.data['inputs'])
        try:
            data = request.data['inputs']
        except:
            data = request.data
            print('except block')
        print('before serializer',data)
        data['username']=id
        serializer = OrderSerializer(data=data)
        print('received data from react',data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
    #to update existing records using pk
    elif request.method == 'PUT':
        if id!='':
            updateOrder = list(OmsAdmin.objects.filter(id=id).values())
            updateOrder = updateOrder[0] 
            updateOrder[request.data['fieldUpdate']] = request.data['newValue']
            updateOrder['username'] =  request.data['username']
            serializer = OrderSerializer(order,data=updateOrder)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_304_NOT_MODIFIED)
        
    elif request.method == 'DELETE':
        if id!='':
            order.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET','POST','PUT','DELETE'])
def get_login(request,username='',format=''):
    
    if username!='':
        try:
            login = LoginDetails.objects.all().get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        if username!='':
            serializer = LoginSerializer(login)
            return Response(serializer.data,status=status.HTTP_200_OK)
        elif username == '':
            logins = LoginDetails.objects.all()
            serializer = LoginSerializer(logins, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'POST':
        print(request.data)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
    elif request.method == 'PUT':
        if username!='':
            serializer = LoginSerializer(login,data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'error':'a unknown'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        
    elif request.method == 'DELETE':
        if username!='':
            login.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
        