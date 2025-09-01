from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from myntraBulk import myntra
from savana import savana
from newmeBulk import newme

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index2.html')

@app.route('/submit', methods=['POST'])
def sub_data():
    try:
        data = request.get_json()
        web_name = data.get("website")
        urls = data.get("urls")

        if not web_name :
            return jsonify({"error": "Missing fields"}), 400
        
        if web_name == "myntra":
            print("Calling myntra with", urls)
            result = myntra(urls)
            print("Myntra done")
        elif web_name == "newme":
            print("Calling newme with", urls)
            result = newme(urls)
            print("Newme done")
        elif web_name == "savana":
            print("Calling savana with", urls)
            result = savana(urls)
            print("Savana done")

        print("data sended")
        print(result)
        return jsonify({"result":result}), 200
    except Exception as e:
        print("error")
        return jsonify({"error":str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)