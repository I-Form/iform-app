import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__),'api'))
from api import app

if __name__=="__main__":
    app.run(host='0.0.0.0')
