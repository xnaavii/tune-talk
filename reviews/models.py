from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
# Create your models here.
class Album(models.Model):
    title = models.CharField(max_length=200)
    artwork = CloudinaryField('image')
    artist = models.CharField(max_length=200)
    release_date = models.CharField(max_length=200)