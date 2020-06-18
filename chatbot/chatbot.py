from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
import json


def create_chatbot():
    try:
        with open('env.json', 'r') as env_file:
            env_dict = json.load(env_file)
            database_path = env_dict["database_path"]
    except FileNotFoundError:
        with open('env.json', 'r') as env_file:
            env_dict = json.load(env_file)
            database_path = env_dict["database_path"]
    # Creating ChatBot Instance
    chatbot = ChatBot(
        'Tom',
        storage_adapter='chatterbot.storage.SQLStorageAdapter',
        database_uri=database_path,
        logic_adapters=[
        'chatterbot.logic.BestMatch'
    ]
    )

    return chatbot

def train_chatbot(chatbot):
     # Training with Personal Ques & Ans
    conversation = [
        "Hallo",
        "Hallöchen!",
        "Wie geht es dir?",
        "Mir geht es sehr gut, wie geht es dir?",
        "Mir geht es auch gut",
        "Das ist schön zu hören"
        "Mir geht es schlecht",
        "Oh was ist passiert?"
        "Was mcahst du gerade so?",
        "Ich hänge hier etwas ab",
        "Was ist dein Lieblingsessen?",
        "Ich mag Fisch",
        "Wer ist Svenja?",
        "Svenja ist 1.70 m groß und eine toller Sportlerin mit gruenen Augen. Sie ist soooo toll",

    ]
    trainer = ListTrainer(chatbot)
    trainer.train(conversation)

    # Training with English Corpus Data
    trainer_corpus = ChatterBotCorpusTrainer(chatbot)
    trainer_corpus.train(
        'chatbot.diverse',
        'chatbot.personen'
    )
    return chatbot