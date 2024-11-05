from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

users_data = []
study_plans_data = []
fav_data = []

def connect_db():
    db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )

    return db

try:
    db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
    if db.is_connected():
        print("Database connection successful!")
except Error as e:
    print(f"Error connecting to the database: {e}")


def fetch_users():
    global users_data
    print("fetch_data")
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT username, password FROM User")
        users_data = cursor.fetchall()
        cursor.close()
        print(f"Fetched users: {users_data}")
    except Error as e:
        print(f"Error while fetching users: {e}")


def fetch_study_plans():
    global study_plans_data
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT sp.id, sp.year, sp.semester, c.no, c.name, c.credit, c.prof, c.type_id
            FROM StudyPlan sp
            JOIN Course c ON sp.course_no = c.no
        """)
        study_plans_data = cursor.fetchall()
        cursor.close()
        print(f"Fetched study plans: {study_plans_data}")
    except Error as e:
        print(f"Error while fetching study plans: {e}")


def fetch_favorites():
    global fav_data
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT f.course_no, c.no, c.name, c.credit, c.prof, c.type_id
            FROM Favorites f
            JOIN Course c ON f.course_no = c.no
        """)
        fav_data = cursor.fetchall()
        cursor.close()
        print(f"\n\nFetched favorite courses: {fav_data}")
    except Error as e:
        print(f"Error while fetching favorite courses: {e}")


@app.route('/')
def home():
    return "Welcome to the Flask API!"


@app.route('/users', methods=['POST'])
def find_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        user = next(
            (user for user in users_data if user['username'] == username and user['password'] == password), None)

        if user:
            return jsonify({"message": "User found", "user": user}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error while processing user data: {e}")
        return jsonify({"message": "Internal Server Error"}), 500


@app.route('/studyplan', methods=['GET'])
def get_study_plan():
    if study_plans_data:
        return jsonify(study_plans_data), 200
    else:
        return jsonify({"message": "No study plans found."}), 404


@app.route('/fav', methods=['GET'])
def get_fav():
    return fav_data


@app.route('/test', methods=['GET'])
def test():
    db = connect_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT f.course_no, c.no, c.name, c.credit, c.prof, c.type_id
        FROM Favorites f
        JOIN Course c ON f.course_no = c.no
    """)

    test = cursor.fetchone()
    db.close()

    if test:
        result = {
            "course_no": test[0],
            "no": test[1],
            "name": test[2],
            "credit": test[3],
            "prof": test[4],
            "type_id": test[5]
        }
        return jsonify(result)
    else:
        return "No data found", 404
    
@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.json
    content_feedback = data.get('contentFeedback')
    prof_feedback = data.get('profFeedback')
    exam_feedback = data.get('examFeedback')
    rating = data.get('rating')  
    print(rating)

    db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
    cursor = db.cursor()

    try:
        cursor.execute("""
            INSERT INTO Review (contentFeedback, profFeedback, examFeedback, rating)
            VALUES (%s, %s, %s, %s)
        """, (content_feedback, prof_feedback, exam_feedback, rating))
        
        db.commit()
        
        return jsonify({"message": "Review added successfully!"}), 201
    except Error as e:
        db.rollback()
        print(f"Error while adding review: {e}")
        return jsonify({"message": "Failed to add review"}), 500
    finally:
        cursor.close()
        db.close()




if __name__ == '__main__':
    fetch_users()
    fetch_study_plans()
    fetch_favorites()
    app.run()
