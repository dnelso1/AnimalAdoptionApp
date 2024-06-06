import os

from google.cloud.sql.connector import Connector, IPTypes
import pymysql

import sqlalchemy

def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of MySQL.

    Uses the Cloud SQL Python Connector package.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.

    # instance_connection_name = os.environ[
    #     "INSTANCE_CONNECTION_NAME"
    # ]  # e.g. 'project:region:instance'
    # db_user = os.environ["DB_USER"]  # e.g. 'my-db-user'
    # db_pass = os.environ["DB_PASS"]  # e.g. 'my-db-password'
    # db_name = os.environ["DB_NAME"]  # e.g. 'my-database'

    instance_connection_name = 'mysql-animal-adoption-app:us-central1:animal-adoption-app-instance'
    db_user = 'group-member'  # e.g. 'my-db-user'
    db_pass = '0467'  # e.g. 'my-db-password'
    db_name = 'animal-adoption-app-db'  # e.g. 'my-database'
    unix_socket_path = '/cloudsql/mysql-animal-adoption-app:us-central1:animal-adoption-app-instance'

    connector = Connector()

    def getconn() -> pymysql.connections.Connection:
        conn: pymysql.connections.Connection = connector.connect(
            instance_connection_name,
            "pymysql",
            user=db_user,
            password=db_pass,
            db=db_name
        )
        return conn

    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
        # [START_EXCLUDE]
        # Pool size is the maximum number of permanent connections to keep.
        pool_size=5,
        # Temporarily exceeds the set pool_size if no connections are available.
        max_overflow=2,
        # The total number of concurrent connections for your application will be
        # a total of pool_size and max_overflow.
        # 'pool_timeout' is the maximum number of seconds to wait when retrieving a
        # new connection from the pool. After the specified amount of time, an
        # exception will be thrown.
        pool_timeout=30,  # 30 seconds
        # 'pool_recycle' is the maximum number of seconds a connection can persist.
        # Connections that live longer than the specified amount of time will be
        # re-established
        pool_recycle=1800,  # 30 minutes
        # [END_EXCLUDE]
    )

    db = pool.connect()
    db.close()

    return pool