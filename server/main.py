from flask import Flask, render_template, request
from ml.ranker import Ranker
from PIL import Image

app = Flask(__name__)

ranker = Ranker()

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/rank', methods=['POST'])
def rank():
    body = request.files.to_dict()

    ret = {}

    for key in body.keys():
        image = Image.open(body[key])
        r = ranker.predict(image)
        ret[key] = r

    return ret

if __name__ == '__main__':
    app.run()