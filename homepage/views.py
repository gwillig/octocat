from django.http import Http404, JsonResponse
from django.shortcuts import render
import pickle
from io import BytesIO
import numpy as np
import urllib.request
import json
import IPython.display as ipd
import wave
import librosa
from homepage.models import Memory
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from sklearn.naive_bayes import GaussianNB
url ="https://samples.openweathermap.org/data/2.5/weather?q=Eberstadt,%20DE&appid=b6907d289e10d714a6e88b30761fae22"
import sys
np.set_printoptions(threshold=sys.maxsize)
def get_mfcc_feature(data):
    """
    Converts a wave file into his mfcc features
    @args:
        data(binary):
    @return:
        mfcc_features(np.array)
    """
    fs=44100
    x = librosa.util.fix_length(data, 45000)
    mfcc_features = librosa.feature.mfcc(y=x, sr=fs)

    return mfcc_features


@method_decorator(csrf_exempt, name='post')
def classify_audio(request):
    '#0.Step: Get data for classification'
    data = request.body
    '#1.Step: Check if shape is dividy by 2 zero'
    if len(data)%2==0:
       data_float = librosa.util.buf_to_float(data)
    else:
        data_float = librosa.util.buf_to_float(data[:-1])
    '#0.1.Step: Get mfcc feature for data'

    mfcc = get_mfcc_feature_data(data_float)
    mfcc_flatten = mfcc.flatten()
    '#1.Step: Load all data from dbase table Memory'
    all_memories = Memory.objects.all()
    '#2.Step: Calculate MFCC for each file'
    train_data = np.array([])
    train_label = []
    for el in all_memories:
        # data_np = np.fromstring(el.blob_data, dtype=np.float32)
        # mfcc = get_mfcc_feature_data(data_np)
        np_bytes = el.blob_data
        load_bytes = BytesIO(np_bytes)
        loaded_np = np.load(load_bytes, allow_pickle=True)
        if train_data.shape[0]==0:
            train_data= np.array([ loaded_np])
        else:
            train_data = np.vstack((train_data, loaded_np))
        train_label.append(el.ground_truth)
    '#3.Step: Fit bayes classifier'
    clf = GaussianNB()
    clf.fit(train_data,train_label)
    '#4.Step: Make prediction'
    prediction = clf.predict([mfcc_flatten])
    print(prediction)
    return JsonResponse({"prediction": str(prediction)})

def home(request,name_person ):
    print(name_person)
    return render(request, 'home.html',{"name_person":name_person})

@method_decorator(csrf_exempt, name='post')
def recorded_audio(request):
    data = request.body
    ground_truth = request.headers["Ground-Truth"]
    '#1.Step: Check if shape is dividy by 2 zero'
    if len(data)%2==0:
       data_float = librosa.util.buf_to_float(data)
    else:
        data_float = librosa.util.buf_to_float(data[:-1])
    mfcc = get_mfcc_feature_data(data_float).flatten()
    np_bytes = BytesIO()
    np.save(np_bytes, mfcc, allow_pickle=True)
    np_bytes = np_bytes.getvalue()
    m1 = Memory(ground_truth=ground_truth, blob_data=np_bytes)
    m1.save()

    return JsonResponse({"test":"test"})

def reco(request):
    return render(request, 'reco.html')

def audio(request):
    '#1.Step: Get all memoires for the table'
    all_memories = Memory.objects.all()
    all_memories_list = []
    for el in Memory.objects.all():
        all_memories_list.append({"ground_truth":el.ground_truth,
                                  "blob_data":el.blob_data
                                  })
    return render(request,'record_audio.html',{"Person":"Gustav","all_memories_list":all_memories_list})


def get_weather(request):
    url = 'http://api.openweathermap.org/data/2.5/weather?q=Eberstadt,ger&units=metric&lang=de&APPID=b3b25ed86b9fb6cfaac03f9b37164eef'
    req = urllib.request.urlopen(url)
    req_con = req.read().decode('utf-8')
    req_json = json.loads(req_con)
    return JsonResponse(req_json)


def personal_information(request):
    pass


# Get example audio file
def get_mfcc_feature_data(data):
    """
    Converts a wave file into his mfcc features
    @args:
        data_path(str):
    @return:
        mfcc_features(np.array)
    """
    fs = 44100
    x = librosa.util.fix_length(data, 45000)
    mfcc_features = librosa.feature.mfcc(y=x, sr=fs)

    return mfcc_features