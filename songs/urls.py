from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.SongsListView.as_view()),
]
