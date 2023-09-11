import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB= 'credentialsdb.db'

def get_row_as_dict(row):
    row_dict = {
        'ID':row[0],
        'username':row[1],
        'password':row[2],
        'email':row[3],
        'phone':row[4],
        'createDate':row[5],
    }
    return row_dict

app = Flask(__name__)

@app.route('/api/users/<string:email>', methods=['GET'])
def show(email):
    db =sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email=?',(email,))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/users', methods=['POST'])
def save():
    if not request.json:
        abort(404)

    new_user = (
        request.json['username'],
        request.json['password'],
        request.json['email'],
        request.json['phone'],
        request.json['createDate'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('INSERT INTO users(username,password,email,phone,createDate) VALUES (?,?,?,?,?)',
                   new_user)
    user_id = cursor.lastrowid
    db.commit()

    response = {'id':user_id,
                'affected':db.total_changes}
    
    db.close()
    return jsonify(response), 201


@app.route('/api/users/<string:email>',methods=['PUT'])
def update(email):
    if not request.json:
        abort(400)
    if 'email' not in request.json:
        abort(400)
    if request.json['email'] != email:
        abort(400)
    
    update_user = (
        request.json['username'],
        request.json['password'],
        request.json['phone'],
        email,
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute("UPDATE users SET username=?, password=?, phone=? WHERE email=?"
    ,update_user)

    db.commit()

    response ={
        'email': email,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/users/<string:email>', methods = ['DELETE'])
def delete(email):
    if not request.json:
        abort(400)
    if 'email' not in request.json:
        abort(400)
    if request.json['email'] != email:
        abort(400)
    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM users WHERE email=?', (email,))

    db.commit()

    response = {
        'email': email,
        'affected': db.total_changes,
    }

    db.close()
    return jsonify(response),201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)