import sqlite3
import json


con = sqlite3.connect("database.sqlite3")

con.execute('SELECT name FROM sqlite_master WHERE type = "table"').fetchall()
statement="PRAGMA table_info(statement);"
con.execute(statement).fetchall()


##############################

import sqlalchemy
from sqlalchemy import orm

try:
    with open('env.json', 'r') as env_file:
        env_dict = json.load(env_file)
        database_path = env_dict["database_path"]
except FileNotFoundError:
    with open('env.json', 'r') as env_file:
        env_dict = json.load(env_file)
        database_path = env_dict["database_path"]
db_path = database_path
db_con = sqlalchemy.create_engine(db_path)
result = db_con.execute("show tables")
for row in result:
    print(row)