FROM node:16
COPY frontend/iform-app iform-app
RUN cd iform-app && npm install
RUN cd iform-app && ./node_modules/.bin/ng build --prod --deploy-url static/iform-app/

FROM ubuntu:18.04
COPY --from=0 iform-app ./iform-app

RUN apt-get update && apt-get install -y sudo python3-pip
RUN pip3 install --upgrade pip


# api and frontend
COPY requirements.txt .
RUN sudo pip install -r requirements.txt
RUN sudo apt-get install -y gunicorn3

COPY api api
RUN sudo cp ./iform-app/dist/iform-app/index.html api/templates/index.html
RUN sudo cp -r ./iform-app/dist/iform-app api/static/iform-app
    
COPY startProd.sh startProd.sh
COPY wsgi.py wsgi.py
    
EXPOSE 8080


# Create a new user
RUN useradd -ms /bin/bash iform
USER iform

CMD ./startProd.sh