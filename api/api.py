print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
print('Starting IForm App')
print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

import logging
import flask, sys, os, json
from flask import request, jsonify, url_for, redirect
from flask import render_template
from flask_cors import CORS
from auth import authenticator
import auth

# add path for other requirements
sys.path.append(os.path.join(os.path.dirname(__file__),'../lnInclude'))
from config import config


app = flask.Flask(__name__)
CORS(app)


def _build_cors_prelight_response():
    response = flask.make_response('','200 OK')
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route('/', methods=['GET'])
@app.route('/MeltPool', methods=['GET'])
def index():
    return flask.render_template('index.html')


@app.route('/help')
def help():
    return flask.render_template('help.html')


@app.route('/login', methods=['POST'])
def login():
    print('Login:')
    if auth.verify_password(request.form['username'],request.form['password']):
        return json.dumps({'token':auth.generate_auth_token(request.form['username']).decode('ascii')})

@app.route('/verifyLogin')
@authenticator.login_required
def verifyLogin():
    return ''

import numpy as np
from matplotlib import pyplot as plt
from io import BytesIO
from scipy.spatial import Voronoi,voronoi_plot_2d
import base64

sys.path.append('api/emulators/3in1out')
import pbfGaussianProcess_copy_app

@app.route('/meltingEmulator',methods=['POST'])
@authenticator.login_required
def submitSimulation():
    print(request.form)

    laser_power = float(request.form.get('laser_power'))
    layer_thickness = float(request.form.get('layer_thickness'))
    scanning_speed = float(request.form.get('scanning_speed'))

    layer_width = pbfGaussianProcess_copy_app.emulator1([[laser_power,scanning_speed,layer_thickness]])
    print(layer_width)
    # # possible image result
    # points = np.random.rand(10,2)
    # vor = Voronoi(points)
    # fig = voronoi_plot_2d(vor)

    # buf = BytesIO()
    # plt.savefig(buf)
    # buf.seek(0)
    # encode = base64.b64encode(buf.read())
    # decode = encode.decode('utf-8')

    results = {'layer_width':layer_width[0], 'layer_height':'NONE'}
    return results

@app.route('/microstructureCalculator', methods=['POST'])
@authenticator.login_required
def microstructure():
    grain_size = float(request.form.get('grain_size'))
    porosity = float(request.form.get('porosity'))
    return {'value':porosity*(grain_size + 100)}


if __name__ == '__main__':
    # context = ('server.crt','server.key')
    # app.run(debug=False,ssl_context=context)
    print('user login test')
