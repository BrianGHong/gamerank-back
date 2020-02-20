#!/usr/bin/python

import requests
import json
from datetime import datetime

# Lettuce test the IGDB api!

reqUrl = "https://api-v3.igdb.com/"
reqKey = "0b33793cc09a4bfd9330924d3874fde2"

i = 0
iE = 1
while (i < iE):

    gameID = 26845
    payload = 'fields *; where id = ' + str(gameID) + ';'
    headers = {'content-type': 'application/json', 'user-key': reqKey}

    # Get game information
    response = requests.post(reqUrl+"games", data=payload, headers=headers)
    response = json.loads(response.text)[0]

    # From response, get raw metadata if possible
    gameTitle = response["name"]
    gameSummary = response["summary"]
    gameUrl = response["url"]
    gameDor = datetime.utcfromtimestamp(response["first_release_date"]).strftime('%Y-%m-%d')

    # From response, get additional IDs
    coverID = response["cover"] 
    devID = response["involved_companies"]
    platID = response["platforms"]
    bgID = response["screenshots"]
    vidID = response["videos"]
    
    # Use IDs to retrieve data
    coverRe = requests.post(reqUrl+"covers", data="fields *; where id = " + str(coverID) + ";", headers=headers)
    gameCover = json.loads(coverRe.text)[0]["url"][2:]
    
    # This is a sneaky one... we have an array of ID's, each one associated with a particular developer
    # We want to iterate through each element and extract each company/dev
    # And from there, we put all the names together into a list
    # It WOULD be better to have each company be an element in an array, and to differentiate between pub/dev, but it would just mean more work for us in the backend... so meh. This shouldn't violate 1nf
    gameDevs = ""
    for i in range(len(devID)):
        getCompany = requests.post(reqUrl+"involved_companies", data="fields *; where id = " + str(devID[i]) + ";", headers=headers)
        getName = requests.post(reqUrl+"companies", data="fields name; where id = " + str(json.loads(getCompany.text)[0]["company"])+";", headers=headers)
        finalName = json.loads(getName.text)[0]["name"]
        gameDevs += finalName
        if (len(devID) - i > 1):
            gameDevs += ", "

    # Similar to above, we wanna iterate through an array of IDs to find each and every platform name
    gamePlats = ""
    for i in range(len(platID)):
        getPlat = requests.post(reqUrl+"platforms", data="fields name; where id = " + str(platID[i]) + ";", headers=headers)
        finalName = json.loads(getPlat.text)[0]["name"]
        gamePlats += finalName
        if (len(platID) - i > 1):
            gameDevs += ", "

    # Let's get a background for our game page
    bgRe = requests.post(reqUrl+"screenshots", data="fields url; where id = " + str(bgID[0]) + ";", headers=headers)
    gameBG = json.loads(bgRe.text)[0]["url"][2:]

    # Finally, a video?
    vidRe = requests.post(reqUrl+"game_videos", data="fields *; where id = " + str(vidID[0]) + ";", headers=headers)
    gameVid = "https://youtube.com/watch?v=" + str(json.loads(vidRe.text)[0]["video_id"])

    # Compile metadata
    metadata = {
        "title": gameTitle,
        "igdb_id": gameID,
        "cover": gameCover,
        "dor": gameDor, 
        "devpub": gameDevs,
        "plat": gamePlats,
        "summary": gameSummary,
        "bg_img": gameBG,
        "url": gameUrl,
        "trailer": gameVid,
        }
            
    print(metadata)
    i += 1

