from django.db import models

# Create your models here.

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    challenge_question= models.CharField(max_length=100)
    world_question= models.CharField(max_length=100)

