from django.db import models
from django.utils import timezone
# Create your models here.

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30,blank=True, null=True)
    challenge_question= models.CharField(max_length=100,blank=True, null=True)
    world_question= models.CharField(max_length=100,blank=True, null=True)

    def __str__(self):
        return (self.first_name)

class Memory(models.Model):
    id = models.AutoField(primary_key=True)
    blob_data_raw = models.BinaryField(blank=True, null=True)
    blob_data_float = models.BinaryField(blank=True, null=True)
    blob_data_mfcc = models.BinaryField(blank=True, null=True)
    ground_truth = models.CharField(max_length=30)

    def __str__(self):
        return (self.ground_truth)


class Raw_Conversation(models.Model):
    id = models.AutoField(primary_key=True)
    person_name = models.CharField(max_length=60, blank=True, null=True)
    person_statement = models.CharField(max_length=100, blank=True, null=True)
    chatbot_response = models.CharField(max_length=100, blank=True, null=True)
    person_statement_date = models.DateTimeField( default=timezone.now())
    note = models.CharField(max_length=300, blank=True, null=True)

    def __str__(self):
        return (f"{self.person_name}_{self.person_statement_date}")
