from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here. 
class TopAlbum(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=100)
    image = CloudinaryField('image')
    description = models.TextField()

    def __str__(self):
        return self.title