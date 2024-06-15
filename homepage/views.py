from django.shortcuts import render
from .models import TopAlbum

# Create your views here.
def home(request):
    top_albums = TopAlbum.objects.all()[:3]
    context = {'top_albums': top_albums}

    return render(request, 'base.html', context)