from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('get_orders',views.get_orders, name='getOrders'),
    path('get_orders/<str:id>',views.get_orders,name='getorder'),
    path('get_login',views.get_login,name='getlogin'),
    path('get_login/<str:username>',views.get_login,name='getLogin'),
]

urlpatterns = format_suffix_patterns(urlpatterns)