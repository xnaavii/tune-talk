import os
from django.shortcuts import render
from django.http import HttpResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


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
