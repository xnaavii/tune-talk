from django.urls import path
from . import views

urlpatterns = [
    path('', views.review_list, name="review_list"),
    path('search/', views.search_album, name="search_album"),
    path('search/album_review/<str:album_id>/', views.album_review, name='album_review'),
]