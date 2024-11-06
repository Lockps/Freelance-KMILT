from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

users_data = []
study_plans_data = []
fav_data = []
course_data = []



def fetch_users():
    global users_data
    print("fetch_data")
    try:
        db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
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
        db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
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
        db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
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

def fetch_courses():
    global course_data
    try:
        db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT c.no, c.name, c.credit, c.prof, c.type_id
            FROM Course c
        """)
        course_data = cursor.fetchall()
        cursor.close()
        print(f"\n\nFetched courses: {course_data}")
    except Error as e:
        print(f"Error while fetching courses: {e}")



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
    print("Starting fetch")
    fetch_study_plans()
    if study_plans_data:
        return jsonify(study_plans_data), 200
    else:
        return jsonify({"message": "No study plans found."}), 404


@app.route('/fav', methods=['GET'])
def get_fav():
    return fav_data

@app.route('/addFavorite', methods=['POST'])
def addFavorite():
    """Add a course to favorites."""
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'course_no' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        db = mysql.connector.connect(
            host="153.92.15.23",
            user="u245175828_KMITL",
            password="KMITLmath1234",
            database="u245175828_KMITL"
        )
        
        cursor = db.cursor()
        insert_query = """
            INSERT INTO Favorites (user_id, course_no) 
            VALUES (%s, %s)
        """
        cursor.execute(insert_query, (data['user_id'], data['course_no']))
        db.commit()  # Commit the transaction

        return jsonify({"message": "Course added to favorites"}), 201
    except mysql.connector.Error as db_error:
        return jsonify({"error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        db.close()

@app.route('/removeFavorite/<int:course_no>', methods=['DELETE'])
def removeFavorite(course_no):
    """Remove a course from favorites."""
    user_id = request.args.get('user_id')  # Assuming you have a user_id to identify the user's favorites

    try:
        db = mysql.connector.connect(
            host="153.92.15.23",
            user="u245175828_KMITL",
            password="KMITLmath1234",
            database="u245175828_KMITL"
        )
        
        cursor = db.cursor()
        delete_query = """
            DELETE FROM Favorites 
            WHERE user_id = %s AND course_no = %s
        """
        cursor.execute(delete_query, (user_id, course_no))
        db.commit()  # Commit the transaction

        return jsonify({"message": "Course removed from favorites"}), 200
    except mysql.connector.Error as db_error:
        return jsonify({"error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        db.close()


@app.route('/courses', methods=['GET'])
def get_courses():
    print("asdasd")
    fetch_courses()  
    return jsonify(course_data)  


@app.route('/test', methods=['GET'])
def test():
    db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
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
    course_id = data.get('course_id')  
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
            INSERT INTO Review (course_id, contentFeedback, profFeedback, examFeedback, rating)
            VALUES (%s, %s, %s, %s, %s)
        """, (course_id, content_feedback, prof_feedback, exam_feedback, rating))
        
        db.commit()
        
        return jsonify({"message": "Review added successfully!"}), 201
    except Error as e:
        db.rollback()
        print(f"Error while adding review: {e}")
        return jsonify({"message": "Failed to add review"}), 500
    finally:
        cursor.close()
        db.close()


@app.route('/getCareer', methods=['GET'])
def getCareer():
    try:
        db = mysql.connector.connect(
            host="153.92.15.23",
            user="u245175828_KMITL",
            password="KMITLmath1234",
            database="u245175828_KMITL"
        )
        
        cursor = db.cursor(dictionary=True) 
        cursor.execute("""
            SELECT cc.career_id, cc.course_id, c.name AS course_name 
            FROM Course_career cc 
            JOIN Course c ON cc.course_id = c.no
        """)
        results = cursor.fetchall()  

        return jsonify(results)  
    except mysql.connector.Error as db_error:
        return jsonify({"error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        try:
            cursor.close()
        except:
            pass  
        try:
            db.close()
        except:
            pass  

@app.route('/add_course', methods=['POST'])
def add_course():
    print("Data coming")
    data = request.json

    print("Received data:", data)

    course_id = data.get('courseId')
    course_name = data.get('courseName')
    professor = data.get('professor')
    year = data.get('year')
    semester = data.get('semester')

    if not all([course_id, course_name, professor, year, semester]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        db = mysql.connector.connect(
            host="153.92.15.23",
            user="u245175828_KMITL",
            password="KMITLmath1234",
            database="u245175828_KMITL"
        )
        cursor = db.cursor()
        
        cursor.execute(
            "INSERT INTO Course (no, name, prof, type_id) VALUES (%s, %s, %s, 1)",
            (course_id, course_name, professor)
        )

        print("Successful")

        cursor.execute(
            "INSERT INTO StudyPlan (course_no, year, semester) VALUES (%s, %s, %s)",
            (course_id, year, semester)
        )
        
        db.commit()
        return jsonify({"message": "Course added successfully!"}), 201

    except mysql.connector.Error as db_error:
        print(f"Database error: {db_error}")
        return jsonify({"error": str(db_error)}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        try:
            cursor.close()
        except:
            pass  
        try:
            db.close()
        except:
            pass  


@app.route('/comment', methods=["POST"])
def getComment():
    data = request.json
    cid = data.get('id')
    
    db = mysql.connector.connect(
        host="153.92.15.23",
        user="u245175828_KMITL",
        password="KMITLmath1234",
        database="u245175828_KMITL"
    )
    cursor = db.cursor(dictionary=True)

    try:
        # Use parameterized query to prevent SQL injection
        cursor.execute("SELECT * FROM Review WHERE course_id = %s", (cid,))
        comments = cursor.fetchall()

        return jsonify(comments), 200  # Return comments as JSON with status code 200
    except Exception as e:
        print("Error fetching comments:", e)
        return jsonify({"error": "Failed to fetch comments"}), 500
    finally:
        cursor.close()
        db.close()



if __name__ == '__main__':
    fetch_users()
    fetch_study_plans()
    fetch_favorites()
    app.run()
