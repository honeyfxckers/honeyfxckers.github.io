from flask import Flask, request
import pandas as pd
import os

app = Flask(__name__)

DATA_DIR = 'data'
DATA_FILE = os.path.join(DATA_DIR, 'ip_log.csv')


# Загрузка данных
def load_data():
    if not os.path.exists(DATA_FILE):
        os.makedirs(DATA_DIR, exist_ok=True)
        return pd.DataFrame(columns=["user_id", "ip_address"])
    return pd.read_csv(DATA_FILE)


# Сохранение данных
def save_data(data):
    data.to_csv(DATA_FILE, index=False)


data = load_data()


@app.route('/log_ip', methods=['GET'])
def log_ip():
    user_id = request.args.get('user_id')
    ip_address = request.remote_addr

    global data
    new_entry = {"user_id": user_id, "ip_address": ip_address}
    data = data.append(new_entry, ignore_index=True)
    save_data(data)

    return f"Logged IP for user {user_id}: {ip_address}"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
