from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def search_album(request):

    if request.method == "GET":

        search_term = request.GET.get("search_term")

        mock_albums = [
            {    "name": "album", "artist": "artist"    }
        ]

        context = {"albums": mock_albums, "search_term": search_term}

        return render(request, "reviews/search_album.html", context)
