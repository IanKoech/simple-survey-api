CREATE TABLE survey (
    survey_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE question (
    question_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    required VARCHAR(3) NOT NULL,
    text TEXT NOT NULL,
    description TEXT,
    options JSONB,
    file_properties JSONB
);

CREATE TABLE response (
    response_id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES survey(survey_id),
    full_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    description TEXT,
    gender VARCHAR(10),
    date_responded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE file (
    file_id SERIAL PRIMARY KEY,
    response_id INTEGER REFERENCES response(response_id),
    file_name VARCHAR(255) NOT NULL,
    format VARCHAR(50) NOT NULL,
    file_size INTEGER
);

CREATE TABLE response_detail (
    response_detail_id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES question(question_id),
    response_id INTEGER REFERENCES response(response_id),
    response TEXT
);
