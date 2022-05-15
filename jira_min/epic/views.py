from django.shortcuts import render

from .models import Epic

# Create your views here.

def epics(request):
    epic_list = Epic.objects.all() #.order_by('-pub_date')[:5]
    context = {'epics': epic_list}
    return render(request, 'epic/epics.ejs', context)

