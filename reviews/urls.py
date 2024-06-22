from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_album, name="search_album"),
    path('search/album/<str:album_id>/', views.album_review, name='album_review'),
]
