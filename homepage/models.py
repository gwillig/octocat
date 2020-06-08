from django.db import models

# Create your models here.

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    challenge_question= models.CharField(max_length=100)
    world_question= models.CharField(max_length=100)

    def __str__(self):
        return (self.first_name)

class Memory(models.Model):
    id = models.AutoField(primary_key=True)
    blob_data = models.BinaryField(null=True, editable=True)
    ground_truth = models.CharField(max_length=30)

    def __str__(self):
        return (self.ground_truth)

