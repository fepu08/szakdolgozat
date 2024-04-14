FROM python:3.10-slim
EXPOSE 5000
WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install -y --no-install-recommends --fix-missing gcc libpython3-dev build-essential libpq-dev
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD [ "python3", "-m" , "flask", "yrun", "--host=0.0.0.0"]