
from django.urls import path
from .views import issues

# Create your URLConf here.

urlpatterns = [
	# this is the /issues url
    path('s', issues),
]
