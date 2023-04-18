import os
from flask import Flask
from twilio.rest import Client
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn import preprocessing
import matplotlib.pyplot as plt

#Flask
app = Flask(__name__)

#Twilio
account_sid = '<Insert Twilio ID>'
auth_token = '<Insert Auth>
twilio_client = Client(account_sid, auth_token)

@app.route('/message')
def send_message():
    message = twilio_client.messages.create(body='hi', from_='+18446041707', to='+19255664252')
    return message.sid

@app.route('/anomaly/<key>')
def anomaly_detect(key):
    data = pd.read_csv('data/test_data.csv')

    #Anomaly Detection Model
    random_state = np.random.RandomState(42)
    model = IsolationForest(n_estimators=100, max_samples='auto', contamination=0.2, random_state=random_state)
    model.fit(data[[key]])

    data['scores'] = model.decision_function(data[[key]])
    data['anomaly_score'] = model.predict(data[[key]])

    anomalies = data[data['anomaly_score']==-1]
    # anomalies = data[data['anomaly_score'==-1]]
    a_rows, a_cols = anomalies.shape

    for row in range(a_rows):
        message = twilio_client.messages.create(body='There is an anomaly at id: ' + str(anomalies.iloc[row]['id']) + '\nThe value is: ' + str(anomalies.iloc[row][key]), from_='<Insert Phone Number>', to='<Insert Phone Number>')
        print(message.sid)

    return 'Messages Sent'

    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    # send_message()