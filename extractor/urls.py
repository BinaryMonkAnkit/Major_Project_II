from django.urls import path
from . import views



urlpatterns = [
    path('', views.index , name= 'home'),
    path('process-document/', views.process_document, name='Extract_tables'),
    path('query-document/', views.query_document, name='Query_document'),
    
]  
