from django.http import Http404, JsonResponse
from django.shortcuts import render
import urllib.request
import json
import wave
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
url ="https://samples.openweathermap.org/data/2.5/weather?q=Eberstadt,%20DE&appid=b6907d289e10d714a6e88b30761fae22"

# ...
def home(request,name_person ):
    print(name_person)
    return render(request, 'home.html',{"name_person":name_person})

@method_decorator(csrf_exempt, name='post')
def recorded_audio(request):
    f = open('./file.wav', 'bx')
    f.write(request.body)
    f.close()
    return JsonResponse({"test":"test"})

def reco(request):
    return render(request, 'reco.html')

def audio(request):
    return render(request,'record_audio.html')


def get_weather(request):
    url = 'http://api.openweathermap.org/data/2.5/weather?q=Eberstadt,ger&units=metric&lang=de&APPID=b3b25ed86b9fb6cfaac03f9b37164eef'
    req = urllib.request.urlopen(url)
    req_con = req.read().decode('utf-8')
    req_json = json.loads(req_con)
    return JsonResponse(req_json)


def personal_information(request):
    pass