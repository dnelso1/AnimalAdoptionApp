from __future__ import annotations

import logging
import os

from flask import Flask, request, jsonify
from flask_cors import CORS

import sqlalchemy

from connect_connector import connect_with_connector

app = Flask(__name__)
CORS(app)

logger = logging.getLogger()

# Error messages
ERROR_SHELTER_NOT_FOUND = {"Error": "No shelter with this id exists"}
ERROR_SHELTER_LOGIN_NOT_FOUND = {"Error": "No shelter with this username and password exists"}
ERROR_SHELTER_USER_ALREADY_EXISTS = {"Error": "Username is already taken."}
ERROR_MISSING_SHELTER_ATTRIBUTES = {"Error": "One or more shelter attributes are missing."}


# Sets up connection pool for the app
def init_connection_pool() -> sqlalchemy.engine.base.Engine:
        return connect_with_connector()
        
    # raise ValueError(
    #     'Missing database connection type. Please define INSTANCE_CONNECTION_NAME'
    # )

db = init_connection_pool()

@app.route('/')
def index():
    return ''

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
    
# Add animal profile
@app.route('/add-animal-profile', methods=['POST'])
def add_animal_profile():
    with db.connect() as conn:
        # Get animal profile data
        content = request.get_json()

        print(content)
        stmt = sqlalchemy.text(
            'INSERT INTO animal_profiles(shelter_id, name, type, breed, disposition, availability, news_item, description, gender, age) '
            'VALUES (:shelter_id, :name, :type, :breed, :disposition, :availability, :news_item, :description, :gender, :age)'
        )
        conn.execute(stmt, parameters={'shelter_id': content["shelter_id"],
                                       'name': content['name'],
                                       'type': content['type'],
                                       'breed': content['breed'],
                                       'disposition': content['disposition'],
                                       'availability': content['availability'],
                                       'news_item': content['news_blurb'],
                                       'description': content['description'],
                                       'gender': content['gender'],
                                       'age': content['age']})
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
        return {'id': id}, 200

# Get a shelter
@app.route('/get-shelter/<int:id>', methods=['GET'])
def get_shelter(id):
    app.logger.info("hello")
    with db.connect() as conn:
        stmt = sqlalchemy.text(
            'SELECT shelter_name, address, email, phone_number, website_link FROM shelters WHERE shelter_id=:shelter_id'
        )
        row = conn.execute(stmt, parameters={'shelter_id': id}).one_or_none()
        if row is None:
            return ERROR_SHELTER_NOT_FOUND, 404
        shelter = row._asdict()
        print(shelter)
        return shelter

# Add a new shelter
@app.route('/add-shelter', methods=['POST'])
def add_shelter():
    with db.connect() as conn:
        content = request.get_json()
        print("content: ", flush=True)

        stmt = sqlalchemy.text(
            'SELECT * FROM shelters WHERE username = :username'
        )
        row = conn.execute(stmt, parameters={'username': content['username']}).one_or_none()
        if row is not None:
            return ERROR_SHELTER_USER_ALREADY_EXISTS, 403
        for field in content:
            if content[field] == '':
                return ERROR_MISSING_SHELTER_ATTRIBUTES, 400
        stmt = sqlalchemy.text(
            'INSERT INTO shelters(username, password, shelter_name, address, email, phone_number, website_link) '
            'VALUES (:username, :password, :shelter_name, :address, :email, :phone_number, :website_link)'
        )
        conn.execute(stmt, parameters={'username': content['username'],
                                       'password': content['password'],
                                       'shelter_name': content['shelter_name'],
                                       'address': content['address'],
                                       'email': content['email'],
                                       'phone_number': content['phone_number'],
                                       'website_link': content['website_link']

        })
        stmt = sqlalchemy.text('SELECT last_insert_id()')
        id = conn.execute(stmt).scalar()
        conn.commit()
        return {'shelter_id': id}, 200

# Update a shelter
@app.route('/update-shelter/<int:id>', methods=['PUT'])
def update_shelter(id):
    with db.connect() as conn:
        stmt = sqlalchemy.text(
            'SELECT shelter_name, address, email, phone_number, website_link FROM shelters WHERE shelter_id=:shelter_id'
        )
        row = conn.execute(stmt, parameters={'shelter_id': id}).one_or_none()
        if row is None:
            return ERROR_SHELTER_NOT_FOUND, 404
        content = request.get_json()
        stmt = sqlalchemy.text(
            'UPDATE shelters '
            'SET shelter_name = :shelter_name, address = :address, email = :email, phone_number = :phone_number, website_link = :website_link '
            'WHERE shelter_id = :shelter_id'
        )
        conn.execute(stmt, parameters={'shelter_name': content['name'],
                                       'address': content['address'],
                                       'email': content['email'],
                                       'phone_number': content['phone_number'],
                                       'website_link': content['website'],
                                       'shelter_id': id})
        conn.commit()
        return 'Successfully updated shelter', 200

# Get animal profiles for a shelter
@app.route('/get-shelter-animals/<int:id>', methods=['GET'])
def get_shelter_animals(id):
    with db.connect() as conn:
        stmt = sqlalchemy.text(
            'SELECT animal_id, name, type, breed, age, gender, disposition, availability, news_item, description '
            'FROM animal_profiles WHERE shelter_id = :shelter_id'
            )
        stmt_2 = sqlalchemy.text(
            'SELECT picture_url FROM animal_pictures WHERE animal_id = :animal_id'
        )
        animals = []
        rows = conn.execute(stmt, parameters={'shelter_id': id})
        for row in rows:
            animal = row._asdict()
            animal_id = animal["animal_id"]
            pictures = []
            rows_2 = conn.execute(stmt_2, parameters={'animal_id': animal_id})
            for row in rows_2:
                picture = row._asdict()
                pictures.append(picture["picture_url"])
            animal['pictures'] = pictures
            animals.append(animal)

        return animals;  

# Delete animal profile
@app.route('/delete-pet-profile/<int:id>', methods=['DELETE'])
def delete_animal_profile(id):
    with db.connect() as conn:
        stmt = sqlalchemy.text(
            'DELETE FROM animal_profiles WHERE animal_id = :animal_id'
        )
        result = conn.execute(stmt, parameters={'animal_id': id})
        conn.commit()

        if result.rowcount == 1:
            return ('', 204)

# Verify shelter login
@app.route('/shelter-login', methods=['GET'])
def shelter_login():
    with db.connect() as conn:
        username = request.args.get('username')
        password = request.args.get('password')
        stmt = sqlalchemy.text(
            'SELECT * FROM shelters WHERE username = :username AND password = :password'
        )
        row = conn.execute(stmt, parameters={'username': username, 'password': password}).one_or_none()
        if row is None:
            print("row is none reached", flush=True)
            return ERROR_SHELTER_LOGIN_NOT_FOUND, 404
        shelter = row._asdict()
        return {'shelter_id': shelter['shelter_id']}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8010, debug=True)