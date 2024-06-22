from django.shortcuts import render
from reviews.models import Review, Album

# Create your views here.
def home(request):
    top_albums = Album.objects.all()[:10]
    context = {'top_albums': top_albums}

    return render(request, 'homepage/home.html', context)