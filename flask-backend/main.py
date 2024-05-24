from __future__ import annotations

import logging
import os

from flask import Flask, request

import sqlalchemy

from connect_connector import connect_with_connector

app = Flask(__name__)

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



if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=8010, debug=True)