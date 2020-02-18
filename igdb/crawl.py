#!/usr/bin/python

import requests
import json

# Lettuce test the IGDB api!

reqUrl = "https://api-v3.igdb.com/games"
reqKey = "0b33793cc09a4bfd9330924d3874fde2"


while (True):

    gameID = 26845
    payload = 'fields *; where id = ' + str(gameID) + ';'
    headers = {'content-type': 'application/json', 'user-key': reqKey}

    response = requests.post(reqUrl, data=payload, headers=headers)


    metadata = {
        'title': ,
        'igdb_id': gameID,
        'cover': ,
        'dor': ,
        'devpub': ,
        'plat': ,
        'summary': ,
        'bg_img': ,
        }

print(response.content)

