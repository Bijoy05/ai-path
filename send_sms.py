import requests
from urllib.parse import urlencode

username = "ueda2920ccc39c93e7b25615f78d7a3e5"
password = "B8E8B3A2B7DCE63644F8758324A6803"

data = {
    'from': 'NodeElk',
    'to': '+46738514392',
    'message': 'Thank you for calling. Please visit'
}

response = requests.post(
    'https://api.46elks.com/a1/sms',
    auth=(username, password),
    data=urlencode(data),
    headers={'Content-Type': 'application/x-www-form-urlencoded'}
)

print(response.text)