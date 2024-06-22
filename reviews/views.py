import os
import spotipy
from django.shortcuts import render, redirect
from spotipy.oauth2 import SpotifyClientCredentials
from .models import Album, Review
from .forms import ReviewForm


def get_spotify_client():
    """
    Set up spotify client credentials manager
    """
    client_id = os.environ.get("SPOTIPY_CLIENT_ID")
    client_secret = os.environ.get("SPOTIPY_CLIENT_SECRET")
    auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)

    return spotipy.Spotify(auth_manager=auth_manager)

def search_album(request):
    """
    Query album data from spotify based on the search_query
    """
    sp = get_spotify_client()

    if request.method == "GET":

        search_term = request.GET.get("search_term")

        results = sp.search(q=search_term, type="artist,album")

        context = {"results": results, "search_term": search_term}

        return render(request, "reviews/search_album.html", context)

def album_review(request, album_id):

    sp = get_spotify_client()
    album_data = sp.album(album_id)

    album, created = Album.objects.get_or_create(
        album_id=album_id,
        defaults={
            'title': album_data['name'],
            'artist': album_data['artists'][0]['name'],
            'release_date': album_data['release_date'],
            'artwork': album_data['images'][0]['url']
        })

    tracks = album_data['tracks']['items']

    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            Review.objects.create(
                album=album,
                user=request.user,
                title=form.cleaned_data['title'],
                content=form.cleaned_data['content'],
                rating=form.cleaned_data['rating']
            )
            return redirect('album_review', album_id=album_id)
    else:
        form = ReviewForm()

    context = {
        'album': album,
        'album_data': album_data,
        'tracks': tracks,
        'form': form,
        'reviews': Review.objects.filter(album=album)
    }

    return render(request, 'reviews/album_review.html', context)


def review_list(request):

    reviews = Review.objects.all()

    context = {'reviews': reviews}

    return render(request, 'reviews/review_list.html', context)