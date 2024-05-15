from flask import Flask

app = Flask(__name__)

@app.route('/')
def landing():
    return app.send_static_file('landing.html')

if __name__ == '__main__':
    app.run()
