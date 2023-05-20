import requests
import os
from dotenv import load_dotenv
import pandas as pd
import datetime

load_dotenv()
app_id = os.getenv("APP_ID")
secret = os.getenv("REDDIT_SEC")
auth = requests.auth.HTTPBasicAuth(app_id, secret)
reddit_username = os.getenv("REDDIT_USER")
reddit_password = os.getenv("REDDIT_PASS")
data = {
    'grant_type': 'password',
    'username': reddit_username,
    'password': reddit_password
}
headers = {'User-Agent': 'Tutorial2/0.0.1'}
res = requests.post('https://www.reddit.com/api/v1/access_token',
                    auth=auth, data=data, headers=headers)
token = res.json()['access_token']
headers['Authorization'] = 'bearer {}'.format(token)
requests.get('https://oauth.reddit.com/api/v1/me', headers=headers)

api = 'https://oauth.reddit.com'
res = requests.get('{}/r/umineko/new'.format(api), headers=headers, params={'limit': '100'})
res_json = res.json()

data = []
for post in res_json['data']['children']:
    data.append({
        'name': post['data']['name'],
        'title': post['data']['title'],
        'selftext': post['data']['selftext'],
        'score': post['data']['score'],
        'upvote_ratio': post['data']['upvote_ratio'],
        'num_comments': post['data']['num_comments'],
        'author': post['data']['author'],
        'created_utc': post['data']['created_utc'],
        'permalink': post['data']['permalink'],
        'subreddit': post['data']['subreddit'],
        'url': post['data']['url']
    })

df = pd.DataFrame(data)
df.to_json('reddit_posts.json', orient='records', indent=4)
print("Data saved to reddit_posts.json")
