-- USER TABLE

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR UNIQUE NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "avatar" VARCHAR DEFAULT '/no-user.jpg',
    "full_name" VARCHAR NOT NULL,
    "summary" TEXT DEFAULT '',
    "experience" TEXT DEFAULT '[]',
    "education" TEXT DEFAULT '[]',
    "skill" TEXT DEFAULT '[]',
    "bio" TEXT DEFAULT '',
    PRIMARY KEY(id)
);

-- POST TABLE

CREATE TABLE posts (
    id uuid DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    post TEXT DEFAULT '',
    img VARCHAR DEFAULT '',
    post_time TEXT,
    comments TEXT DEFAULT '[]',
    total_likes TEXT DEFAULT '[]',
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- COMPANY TABLE

CREATE TABLE company (
    id uuid DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "website" TEXT, 
    "type" TEXT, 
    tagline TEXT,
    logo TEXT,
    cover_pic TEXT,
    "location" TEXT 
);

-- JOB TABLE

CREATE TABLE jobs (
    id uuid DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    position TEXT,
    company TEXT,
    "location" TEXT,
    "type" TEXT,
    workplace_type TEXT,
    "desc" TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);