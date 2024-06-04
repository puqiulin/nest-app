import random
from faker import Faker
import psycopg2
from psycopg2 import connect, OperationalError

fake = Faker()


# password = quote_plus("@123456")
# db = records.Database(f"postgresql+psycopg2://postgres:{password}@127.0.0.1:5432/gin-app")
#
# def generate_users(num):
#     users = [{"name": fake.name(), "email": fake.email()} for _ in range(num)]
#     query = 'insert into users (name, email) values (:name, :email)'
#     db.bulk_query(query, users)
#
# generate_users(100)

def create_db():
    try:
        conn = connect(
            dbname="nest-app",
            user="postgres",
            password="@123456",
            host="127.0.0.1",
            port="5432"
        )
        return conn
    except OperationalError as e:
        print(f"An error occurred: {e}")
        return None


db = create_db()


def generate_users(num):
    cursor = db.cursor()
    for i in range(num):
        id = fake.iana_id()
        user=(id, fake.name(), fake.email())
        query = 'insert into "User" (id ,name, email) values (%s, %s, %s)'
        cursor.execute(query, user)
        db.commit()

        generate_posts(random.randrange(1, 100), id)


def generate_posts(num, user_id):
    cursor = db.cursor()
    users = [(user_id, fake.name(), fake.paragraph()) for _ in range(num)]
    query = 'insert into "Post" (user_id ,title, body) values (%s, %s,%s)'
    cursor.executemany(query, users)
    db.commit()


generate_users(100)
