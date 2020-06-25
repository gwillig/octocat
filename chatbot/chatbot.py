from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer

def create_chatbot():
    # Creating ChatBot Instance
    chatbot = ChatBot(
        'Tom',
        storage_adapter='chatterbot.storage.SQLStorageAdapter',
        database_uri='sqlite:///database.sqlite3'
    )
     # Training with Personal Ques & Ans
    conversation = [
        "Hallo",
        "Hallöchen!",
        "Wie geht es dir?",
        "Mir geht es sehr gut, man könnte das Wasser mal wieder wechseln",
        "Was mcahst du gerade so?",
        "Ich hänge hier etwas ab",
        "Was ist dein Lieblingsessen?",
        "Ich mag Fisch"
        "Wer ist Svenja?"
        "Svenja ist 1.70 m groß und eine toller Sportlerin mit gruenen Augen. Sie ist soooo toll"
    ]

    trainer = ListTrainer(chatbot)
    trainer.train(conversation)

    # Training with English Corpus Data
    trainer_corpus = ChatterBotCorpusTrainer(chatbot)
    trainer_corpus.train(
        'chatbot.diverse'
    )
    return chatbot
