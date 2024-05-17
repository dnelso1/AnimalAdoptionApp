from __future__ import annotations

import logging
import os

from flask import Flask, request
from flask_cors import CORS

import sqlalchemy

from connect_connector import connect_with_connector

app = Flask(__name__)
CORS(app)

logger = logging.getLogger()

# Sets up connection pool for the app
def init_connection_pool() -> sqlalchemy.engine.base.Engine:
    if os.environ.get('INSTANCE_CONNECTION_NAME'):
        return connect_with_connector()
        
    raise ValueError(
        'Missing database connection type. Please define INSTANCE_CONNECTION_NAME'
    )

# This global variable is declared with a value of `None`
db = None

# Initiates connection to database
def init_db():
    global db
    db = init_connection_pool()

@app.route('/')
def index():
    return 'Hello world'

# Example route to test code
@app.route('/get-shelter-names', methods=['GET'])
def get_shelter_names():
    with db.connect() as conn:
        stmt = sqlalchemy.text(
            'SELECT shelter_name FROM shelters'
        )
        rows = conn.execute(stmt)
        shelter_names = []
        for row in rows:
            shelter_names.append(row._asdict()["shelter_name"])
        return {'shelter_names': shelter_names}

@app.route('/add-animal-profile', methods=['POST'])
def add_animal_profile():
    with db.connect() as conn:
        # Get animal profile data
        content = request.get_json()

        print(content)
        stmt = sqlalchemy.text(
            'INSERT INTO animal_profiles(shelter_id, name, type, breed, disposition, availability, news_item, description) '
            'VALUES (:shelter_id, :name, :type, :breed, :disposition, :availability, :news_item, :description)'
        )
        conn.execute(stmt, parameters={'shelter_id': 1,
                                       'name': content['name'],
                                       'type': content['type'],
                                       'breed': content['breed'],
                                       'disposition': content['disposition'],
                                       'availability': content['availability'],
                                       'news_item': content['news_blurb'],
                                       'description': content['description']})
        stmt2 = sqlalchemy.text('SELECT last_insert_id()')
        id = conn.execute(stmt2).scalar()

        picture_urls = []
        for url in content['images']:
            if url != '':
                picture_urls.append(url)

        stmt3 = sqlalchemy.text(
                'INSERT INTO animal_pictures(picture_url, animal_id) '
                'VALUES (:picture_url, :animal_id)'
            )
        for url in picture_urls:
            conn.execute(stmt3, parameters={'picture_url': url,
                                            'animal_id': id})

        conn.commit()
        return ({'id': id})




if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=8010, debug=True)