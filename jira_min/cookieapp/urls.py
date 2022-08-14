# cookieapp/urls.py
from django.urls import path
from cookieapp.views import login_view, get_csrf_token, logout_view, signup_view, get_user

urlpatterns = [
    path('login/', login_view),
    path('signup/', signup_view),
    path('csrf/', get_csrf_token),
    path('logout/', logout_view),
    path('getUser/', get_user),
]
