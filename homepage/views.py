from django.http import Http404, JsonResponse
from django.shortcuts import render
import pickle
import collections
from io import BytesIO
import numpy as np
import urllib.request
import json
import wave
import librosa
import pandas as pd
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
       data_float_raw = librosa.util.buf_to_float(data)
    else:
        data_float_raw = librosa.util.buf_to_float(data[:-1])

    '2.Step: # Trim the beginning and ending silence'
    data_float, index = librosa.effects.trim(data_float_raw)
    '#0.1.Step: Get mfcc feature for data'
    prediction_mfcc = get_mfcc_feature_data(data_float)
    '#0.2.Step: Flatten mfcc '
    prediction_mfcc_fl = prediction_mfcc.flatten()
    '#1.Step: Load all data from dbase table Memory'
    df = pd.DataFrame(list(Memory.objects.all().values()))
    '#2.Step: Create train_label and train_data'
    train_data_list = []
    for i in range(0, len(df)):
        train_data_list.append(
            bytes_numpy(df.loc[i, "blob_data_mfcc"]).flatten()
        )
    train_data = np.array(train_data_list)

    train_label = df["ground_truth"].values
    '#3.Step: Fit bayes classifier'
    clf = GaussianNB()
    clf.fit(train_data, train_label)
    '#4.Step: Make prediction'
    prediction = clf.predict([prediction_mfcc_fl])
    print(prediction)
    '# Make relative prediction'
    relative_predict = clf.predict_log_proba([prediction_mfcc_fl]) / clf.predict_log_proba([prediction_mfcc_fl]).sum()
    relative_predict_round_flat = np.around(relative_predict * 100, 4).flatten()

    '#Step: Combine the classes and the relative'
    result_dict = {}
    for el_cl, el_pre in zip(clf.classes_, relative_predict_round_flat):
        result_dict[el_cl] = el_pre

    '#Step:Sort the dict'
    d_sorted = dict(sorted(result_dict.items(), key=lambda kv: kv[1]))
    print(d_sorted)
    return JsonResponse({"prediction": d_sorted})


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

    '#1.Step: Get the raw data'
    np_bytes = BytesIO()
    np.save(np_bytes, data_float, allow_pickle=True)
    np_bytes_raw = np_bytes.getvalue()
    '#2.Step: Get the mfcc features'
    mfcc = get_mfcc_feature_data(data_float)
    np_bytes = BytesIO()
    np.save(np_bytes, mfcc, allow_pickle=True)
    np_bytes_mfcc = np_bytes.getvalue()
    m1 = Memory(ground_truth=ground_truth,blob_data_raw=data,
                blob_data_float=np_bytes_raw, blob_data_mfcc=np_bytes_mfcc)
    m1.save()

    return JsonResponse({"successfully":"Successfully saved to db"})

def reco(request):
    return render(request, 'reco.html')

def audio(request):
    '#1.Step: Get all memoires for the table'
    all_memories = Memory.objects.all()

    all_memories_list = []
    for el in all_memories.values('ground_truth').distinct():
        key_word = el["ground_truth"]
        Memory.objects.filter(ground_truth=key_word)
        count = Memory.objects.filter(ground_truth=key_word).count()
        all_memories_list.append({"ground_truth":key_word,
                                  "count":count
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

def bytes_numpy(bytes_raw):
    load_bytes = BytesIO(bytes_raw)
    loaded_np = np.load(load_bytes, allow_pickle=True)
    return loaded_np