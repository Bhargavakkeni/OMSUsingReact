from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

'''
Handles user url requests call respective view
'''

urlpatterns = [
    path('get_orders',views.get_orders, name='getOrders'),                      #to view all orders
    path('get_orders/<str:id>',views.get_orders,name='getorder'),               #to view orders based on either id or username
    path('get_login',views.get_login,name='getlogin'),                          #to view all login details
    path('get_login/<str:username>',views.get_login,name='getLogin'),           #to view login details based on username.
]

urlpatterns = format_suffix_patterns(urlpatterns)                               #lets to add extra text to url for example api/get_orders.json