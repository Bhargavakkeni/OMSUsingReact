from django.shortcuts import render,get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OmsAdmin,LoginDetails
from .serializers import OrderSerializer,LoginSerializer
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import csv
import pytz

# Create your views here.

'''
Contains functions that can be executed based on the url requests.
Contains all main functionalites and as database connector to get, store data into database.
'''

#configuring basic syntax on how to display log messages. 
logging.basicConfig(level=logging.INFO, format="%(asctime)s-[%(levelname)s] [%(threadName)s] (%(module)s:%(lineno)d) %(message)s",
                    filename='apirequests.log')


@api_view(['GET','POST','PUT','DELETE'])
def get_orders(request,id='',format=''):
    '''
    This function is to handle api request related to orders.
    '''

    logging.info('api get_orders is called.')

    #It executes if id is not null and method get called is not POST.
    if id!='' and request.method!='POST':
        try:
            order = OmsAdmin.objects.all().get(pk=id)
            #check is used to determine whethe we are dealing with single or multiple records.
            check=True
            logging.info("Records found with given id-{}".format(id))
        except:
            logging.info("Can't find records with given id {}, proceeding to find records with username.".format(id))
            try:
                #here id contains username
                order = OmsAdmin.objects.filter(username=id)
                if order:
                    logging.info("Records found with given username {}.".format(id))
                    check=False
                else:
                    logging.debug("Couldn't found records with given username {}".format(id))
                    return Response(status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                logging.debug("Error occured retrieving records based on username. Error is: {}".format(e))
                return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        '''
        If id is null send all orders.
        If id is not null check whether order is single record or multiple records using check variable.
        '''

        logging.info("GET method is triggered.")
        if id=='':
            orders = OmsAdmin.objects.all()
            serializer = OrderSerializer(orders,many=True)
            logging.info("Returning all the records.")
            return Response(serializer.data,status=status.HTTP_200_OK)
        elif  id!='':
            if check == False:
                serializer = OrderSerializer(order,many=True)
            else:
                serializer = OrderSerializer(order)
            logging.info("Returning records with given id/username-{}".format(id))
            return Response(serializer.data,status=status.HTTP_200_OK)
        
    elif request.method == 'POST':
        '''
        First get the inputs data from request body and add username to the data if the request is coming from react server. 
        '''
        
        logging.info("POST method is triggered.")
        try:
            logging.info("Getting inputs from request.data which comes from react frontend")
            data = request.data['inputs']
        except:
            logging.info("request is from not react front end so assign request.data directly")
            data = request.data
            
        data['username']=id
        try:
            serializer = OrderSerializer(data=request.data)
        except Exception as e:
            logging.debug("Error occured while performing serialization in post: data is {}, error is {}".format(request.data, e))
        if serializer.is_valid(raise_exception=True):
            logging.info("Recieved valid data, saving into database.")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    
    elif request.method == 'PUT':
        '''
        Get the record associated with the id and update it with the data coming from the request, and add username to it.
        Send the updated record to the serializer along with previous record.
        '''
        
        logging.info("PUT method is triggered.")
        if id!='':
            logging.info("Getting preexisting order values and combining it with received ney key,value pair and username")
            updateOrder = list(OmsAdmin.objects.filter(id=id).values())
            updateOrder = updateOrder[0] 
            updateOrder[request.data['fieldUpdate']] = request.data['newValue']
            updateOrder['username'] =  request.data['username']
            serializer = OrderSerializer(order,data=updateOrder)
            if serializer.is_valid(raise_exception=True):
                logging.info("Recieved valid data, updating database.")
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                logging.debug("Didn't recieved valid data. Recieved data is {}".format(request.data))
                return Response(status=status.HTTP_304_NOT_MODIFIED)
        else:
            logging.debug("Missing id in url request.")
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'DELETE':
        '''
        Deletes the record associated with the id.
        '''
        
        logging.info("DELETE method is triggered.")
        if id!='':
            logging.info("Deleting record of a order with id {}".format(id))
            order.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            logging.debug("Couldn't delete the record with id {}".format(id))
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    else:
        logging.debug("Recieved invalid request")
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET','POST','PUT','DELETE'])
def get_login(request,username='',format=''):
    '''
    This function is used to handle all api request related login
    '''

    logging.info("api get_login is called")
    if username!='':
        try:
            logging.info("Retrieving login record with username {}".format(username))
            login = LoginDetails.objects.all().get(username=username)
        except:
            logging.debug("Couldn't found record with username {}".format(username))
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        '''
        If username is null send all the records or send the record associated with the username.
        '''

        logging.info("GET method is triggered.")
        if username!='':
            serializer = LoginSerializer(login)
            logging.info("sending record with username {}".format(username))
            return Response(serializer.data,status=status.HTTP_200_OK)
        elif username == '':
            logins = LoginDetails.objects.all()
            serializer = LoginSerializer(logins, many=True)
            logging.info("sending all records")
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            logging.debug("Invalid request")
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'POST':
        '''
        Saves the new user data into database.
        '''
        
        logging.info("POST method is triggered")
        try:
            serializer = LoginSerializer(data=request.data)
        except Exception as e:
            logging.error("Error while performing login serilization in post: {}".format(e))
        if serializer.is_valid(raise_exception=True):
            logging.info("Recieved valid data, saving into database.")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logging.debug("Didn't recieved valid data. Recieved data is {}".format(request.data))
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
    elif request.method == 'PUT':
        '''
        Updates the user login details based on username.
        '''
        
        logging.info("PUT method is triggered.")
        if username!='':
            serializer = LoginSerializer(login,data=request.data)
            if serializer.is_valid(raise_exception=True):
                logging.info("Recieved valid data, saving into database.")
                serializer.save()
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                logging.debug("Didn't recieved valid data or user doesn't exist. Recieved data is {}".format(request.data))
                return Response({'error':'a unknown'},status=status.HTTP_404_NOT_FOUND)
        else:
            logging.debug("Missing username in url request.")
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        
    elif request.method == 'DELETE':
        '''
        Deletes the login record from the database
        '''
        
        logging.info("DELETE method is triggered.")
        if username!='':
            logging.info("Deleting user record with username {}".format(username))
            login.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            logging.debug("Record with username {} is not found.".format(username))
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    else:
        logging.debug("Invalid request")
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
        
'''
scheduling tasks
'''


def printOrders():
    logging.info('printOrders is called')
    orders = list(OmsAdmin.objects.all().values())
    try:
        logging.info('Opening csv file to write orders.')
        with open('orders.csv','a+',newline='') as file:
            logging.info('Writing data into orders.csv file')
            writer = csv.DictWriter(file, fieldnames=orders[0].keys())
            writer.writeheader()
            writer.writerows(orders)

    except Exception as e:
        with open('errors.txt','a+') as file:
            logging.debug('Error occured during writing into csv file writing error into errors.txt')
            file.write('Error occured: {}'.format(e) + '\n')
        
    finally:
        file.close()


scheduler = BackgroundScheduler()

scheduler = BackgroundScheduler(timezone=pytz.timezone('Asia/Kolkata'))

scheduler.add_job(printOrders,trigger=CronTrigger(minute=1,second=20))
scheduler.start()


