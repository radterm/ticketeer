from django.shortcuts import render
from rest_framework import viewsets, permissions
# from django.views.decorators.csrf import csrf_exempt

from .serializers import EpicSerializer
from .models import Epic

# Create your views here.

def epics(request):
    epic_list = Epic.objects.all() #.order_by('-pub_date')[:5]
    context = {'epics': epic_list}
    return render(request, 'epic/epics.ejs', context)

# api views here.

class EpicView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EpicSerializer
    queryset = Epic.objects.all()

