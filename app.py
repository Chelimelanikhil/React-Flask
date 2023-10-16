# from flask import Flask, request, jsonify
# from flask_mysqldb import MySQL
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# import os

# app = Flask(__name__)
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Nani@1234'
# app.config['MYSQL_DB'] = 'nikil'

# # Initialize CORS with your Flask app
# CORS(app)

# mysql = MySQL(app)

# UPLOAD_FOLDER = 'static/uploads'  # Store images in the 'uploads' directory
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# @app.route('/add_contact', methods=['POST'])
# def add_contact():
#     first_name = request.form['first_name']
#     last_name = request.form['last_name']
#     email = request.form['email']
#     phone_number = request.form['phone_number']
#     image = request.files['image']

#     if image:
#         # Securely save the image file with a unique name
#         filename = secure_filename(image.filename)
#         image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         image.save(image_path)
#         image_url = '/uploads/' + filename  # Adjust the path as needed
#     else:
#         image_url = None

#     cur = mysql.connection.cursor()
#     cur.execute(
#         "INSERT INTO contacts (first_name, last_name, email, phone_number, image) VALUES (%s, %s, %s, %s, %s)",
#         (first_name, last_name, email, phone_number, image_url)
#     )
#     mysql.connection.commit()
#     cur.close()
#     return jsonify(message='Contact added successfully')

# if __name__ == '__main__':
#     app.run(debug=True)




from MySQLdb import MySQLError
import os
from flask import Flask, render_template, request, redirect, send_from_directory, session, url_for, flash
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL

import MySQLdb
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_mysqldb import MySQL
  # You need to import pymysql for database connections

app = Flask(__name__)


# MySQL configurations 
app.config['MYSQL_HOST']= 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Nani@1234'
app.config['MYSQL_DB'] = 'nikil'


mysql = MySQL(app)

CORS(app)


UPLOAD_FOLDER = 'static/uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/view_contacts', methods=['GET','POST'])
def view_contacts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, first_name, last_name, email, image FROM contacts")
    contacts = [{'id': row[0], 'first_name': row[1], 'last_name': row[2], 'email': row[3], 'image': f"http://localhost:5000/static/{row[4]}"} for row in cur.fetchall()]
    cur.close()
    return jsonify({"contacts": contacts})

from flask import jsonify

@app.route('/view_contact/<int:id>', methods=['GET', 'POST'])
def view_contact(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM contacts WHERE id = %s", (id,))
    contact = cur.fetchone()
    cur.close()

    print("Requested ID:", id)
    print("Contact:", contact)  # Check what data is retrieved from the database

    if contact is None:
        return jsonify({"error": "Contact not found"})
    else:
        contact_data = {
            "id": contact[0],
            "first_name": contact[1],
            "last_name": contact[2],
            "email": contact[3],
            "phone_number": contact[4],
            "image": f"http://localhost:5000/static/{contact[5]}"
        }
        return jsonify({"contact": contact_data})

@app.route('/add_contact', methods=['POST'])
def add_contact():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    phone_number = request.form['phone_number']
    image = request.files['image']

    if image:
        # Securely save the image file with a unique name
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        image_url = '/uploads/' + filename  # Adjust the path as needed
    else:
        image_url = None

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO contacts (first_name, last_name, email, phone_number, image) VALUES (%s, %s, %s, %s, %s)",
        (first_name, last_name, email, phone_number, image_url)
    )
    mysql.connection.commit()
    cur.close()
    return jsonify(message='Contact added successfully')



@app.route('/search', methods=['GET'])
def search_contacts():
    query = request.args.get('query')  # Get the search query

    # Define an SQL query to search across all relevant fields
    sql_query = "SELECT id, first_name, image FROM contacts WHERE first_name LIKE %s OR last_name LIKE %s OR phone_number LIKE %s"

    cur = mysql.connection.cursor()
    cur.execute(sql_query, ('%' + query + '%', '%' + query + '%', '%' + query + '%'))
    
    # Fetch all matching rows and include image URLs in the response
    search_results = [{'id': row[0], 'first_name': row[1], 'image': row[2]} for row in cur.fetchall()]
    cur.close()
    
    # Return the search results as JSON
    return jsonify(results=search_results)

@app.route('/delete_contact/<int:id>', methods=['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM contacts WHERE id = %s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify(message='Contact deleted successfully')
    except Exception as e:
        return jsonify(error=str(e)), 500
    

@app.route('/edit_contact/<int:id>', methods=['PUT'])
def edit_contact(id):
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    phone_number = request.form['phone_number']
    image = request.files['image']

    # Check if image is provided
    if image:
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        image_url = '/uploads/' + filename
    else:
        image_url = None

    cur = mysql.connection.cursor()
    cur.execute(
        "UPDATE contacts SET first_name = %s, last_name = %s, email = %s, phone_number = %s, image = %s WHERE id = %s",
        (first_name, last_name, email, phone_number, image_url, id)
    )
    mysql.connection.commit()
    cur.close()
    return jsonify(message='Contact updated successfully')

if __name__ == '__main__':
    app.run(debug=True)





#from flask import Flask,jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)


# @app.route('/api/data')
# def get_data():
#     data = {"message": "Hello Niikhil"}
#     return jsonify(data)

# if __name__== '__main__':
#     app.run(debug=True)