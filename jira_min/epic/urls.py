
from django.urls import path, include
from .views import epics, EpicView
from rest_framework import routers
# from todo import views

router = routers.DefaultRouter()
router.register('', EpicView, 'epics-api')

# Create your URLConf here.

urlpatterns = [
	# this is the /epics url
    path('s', epics),
    # this is the /epic/api/epics url
    path('/api/epics/', include(router.urls)),
]
