import os

from flask import Flask, render_template

# pylint: disable=C0103
app = Flask(__name__)


@app.route('/')
def landing():

    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

@app.route('/index')
def index():
    return render_template('index.php')

# Demo Button Routes
@app.route('/shelter-profile')
def shelter_profile():
    return render_template('ShelterProfilePage.html')

@app.route('/shelter-add-new-animal')
def shelter_add_new_animal():
    return render_template('AddNewAnimalPage.html')

@app.route('/pet-profile')
def pet_profile():
    return render_template('PetDetail.html')

@app.route('/swipe-pets-demo')
def swipe_pets_demo():
    return render_template('SwipePets.html')

@app.route('/pet-home')
def pet_home():
    return render_template('PetHome.html')

@app.route('/shelter-home')
def shelter_home():
    return render_template('ShelterHome.html')

@app.route('/pet-app-home')
def pet_app_home():
    return render_template('PetAppHome.html')

if __name__ == '__main__':
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')
