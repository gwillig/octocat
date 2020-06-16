from django.contrib import admin
from homepage.models import Person, Memory, Raw_Conversation,Statement,Tag,TagAssociation

admin.site.register(Person)
admin.site.register(Memory)
admin.site.register(Raw_Conversation)
admin.site.register(Statement)
admin.site.register(Tag)
admin.site.register(TagAssociation)