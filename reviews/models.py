from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
class Album(models.Model):
    title = models.CharField(max_length=200)
    artwork = models.URLField(max_length=200)
    artist = models.CharField(max_length=200)
    release_date = models.CharField(max_length=200)
    album_id = models.CharField(max_length=50, unique=True, default='temporary_default')

    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return sum(review.rating for review in reviews) / reviews.count()
        else:
            return 0
    def __str__(self):
        return f"{self.title} | {self.artist}"

class Review(models.Model):
    album = models.ForeignKey(Album, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} | {self.album.title} | {self.user} on {self.created_at}"