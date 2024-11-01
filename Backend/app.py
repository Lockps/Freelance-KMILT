from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data to work with (simulates a database)
items = [
    {"id": 1, "name": "Item 1", "description": "This is the first item"},
    {"id": 2, "name": "Item 2", "description": "This is the second item"}
]

# Home route


@app.route('/')
def home():
    return "Welcome to the Flask API!"

# Get all items


@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

# Get a specific item by ID


@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({"error": "Item not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
