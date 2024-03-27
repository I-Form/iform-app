from flask_httpauth import HTTPTokenAuth
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
import os
from config import config

users = {
    os.environ['APPLICATION_USER']: generate_password_hash(os.environ['APPLICATION_PASSWORD']),
}

authenticator = HTTPTokenAuth()

@authenticator.verify_token
def verify_token(token):
    print('token:',token)
    try:
        user =  verify_auth_token(token)
        # print('Valid token for user:',user)
    except:
        pass
    if not user:
        return False
    return True

def verify_password(username, password):
    if username in users and check_password_hash(users[username], password):
        print('verified!')
        return True
    else:
        print('incorrect details!')
        return None

def generate_auth_token(username, expiration = 6000):
    s = Serializer(os.environ.get("SECRET_KEY"), expires_in = expiration)
    return s.dumps({ 'id': username })

def verify_auth_token(token):
    s = Serializer(os.environ.get("SECRET_KEY"))
    try:
        data = s.loads(token)
    except SignatureExpired:
        return None # valid token, but expired
    except BadSignature:
        return None # invalid token
    user = users[data['id']]
    return user