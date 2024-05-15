from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shelter-profile')
def shelter_profile():
    return render_template('shelter_profile.html')

if __name__ == '__main__':
    app.run()
