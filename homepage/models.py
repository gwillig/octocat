from django.db import models

# Create your models here.

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    challenge_question= models.CharField(max_length=100)
    world_question= models.CharField(max_length=100)

    def __str__(self):
        return (self.first_name)

class Memory(models.Model):
    blob_data = models.CharField(max_length=30)
    ground_truth = models.CharField(max_length=30)

    def __str__(self):
        return (self.ground_truth)

