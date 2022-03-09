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

# USER root
# ADD https://raw.githubusercontent.com/creationix/nvm/master/install.sh ./nvm.install.sh
# COPY frontend/iform-app ./iform-app
# RUN sudo apt-get update && sudo apt-get install -y curl
# RUN bash ./nvm.install.sh && export NVM_DIR="$HOME/.nvm"
# RUN . $HOME/.nvm/nvm.sh && nvm install node && cd iform-app && npm install @angular/cli && ./node_modules/.bin/ng build --prod --deploy-url static/iform-app/

#RUN chown -R app iform-app

COPY api api
RUN sudo cp ./iform-app/dist/iform-app/index.html api/templates/index.html
RUN sudo cp -r ./iform-app/dist/iform-app api/static/iform-app
    
COPY startProd.sh startProd.sh
COPY wsgi.py wsgi.py
    
EXPOSE 8080

CMD ./startProd.sh