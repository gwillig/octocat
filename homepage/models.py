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



class Statement(models.Model):
    text = models.CharField(max_length=255, blank=True, null=True)
    search_text = models.CharField(max_length=255)
    conversation = models.CharField(max_length=32)
    created_at = models.DateTimeField(blank=True, null=True)
    in_response_to = models.CharField(max_length=255, blank=True, null=True)
    search_in_response_to = models.CharField(max_length=255)
    persona = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'statement'

    def __str__(self):
        return (f"{self.text}_{self.in_response_to}__{self.created_at}")

class Tag(models.Model):
    name = models.CharField(unique=True, max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag'


class TagAssociation(models.Model):
    tag = models.ForeignKey(Tag, models.DO_NOTHING, blank=True, null=True)
    statement = models.ForeignKey(Statement, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag_association'
