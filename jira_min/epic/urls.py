
from django.urls import path
from .views import epics

# Create your URLConf here.

urlpatterns = [
	# this is the /epics url
    path('s', epics),
]
