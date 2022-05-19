from django.shortcuts import render

from .models import Issue

# Create your views here.

def issues(request):
    issue_list = Issue.objects.all()
    context = {'issues': issue_list}
    return render(request, 'issue/issues.ejs', context)

