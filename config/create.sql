CREATE TABLE IF NOT EXISTS User (
    user_email VARCHAR(128) PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    pass VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game (
    gameID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_details_genre (
    gameID INT,
    FOREIGN KEY(gameID) REFERENCES Game(gameID), 
    genre_name VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_details_developer (
    gameID INT,
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    developer_name VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_details_platforms (
    gameID INT,
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    platform_type VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_details_publishers (
    gameID INT,
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    publisher VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_details_gamemodes (
    gameID INT,
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    gamemode_type VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
    gameID INT,
    user_email VARCHAR(128),
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    FOREIGN KEY(user_email) REFERENCES User(user_email)
);

CREATE TABLE IF NOT EXISTS comment (
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    gameID INT,
    user_email VARCHAR(128),
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    FOREIGN KEY(user_email) REFERENCES User(user_email),
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
    gameID INT,
    user_email VARCHAR(128),
    FOREIGN KEY(gameID) REFERENCES Game(gameID),
    FOREIGN KEY(user_email) REFERENCES User(user_email),
    s_story INT NOT NULL,
    s_gameplay INT NOT NULL,
    s_art INT NOT NULL,
    s_difficulty INT NOT NULL,
    s_value INT NOT NULL
);