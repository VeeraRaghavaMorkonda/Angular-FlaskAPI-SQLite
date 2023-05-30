FROM python:3.8-slim-buster
RUN apt-get update && apt-get -y install && pip3 install flask && pip3 install db-sqlite3 && pip3 install Flask-Cors
WORKDIR /flask-api
COPY . /flask-api/
EXPOSE 8000
ENTRYPOINT [ "python3" ]
CMD [ "main.py" ]