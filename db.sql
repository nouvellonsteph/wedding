DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS updates;
CREATE TABLE IF NOT EXISTS guests (
    guestId VARCHAR(50) PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    brunch INTEGER,
    children INTEGER,
    foodRestriction TEXT,
    accompanyFirstName TEXT,
    accompanyLastName TEXT
);

CREATE TABLE IF NOT EXISTS updates (
    uuid VARCHAR(50) PRIMARY KEY,
    createdAt DATE,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    brunch INTEGER,
    children INTEGER,
    foodRestriction TEXT,
    accompanyFirstName TEXT,
    accompanyLastName TEXT,
  	guestId VARCHAR(50),
    FOREIGN KEY(guestId) REFERENCES guests(guestId) ON DELETE CASCADE
);

INSERT INTO guests (guestId, firstName, lastName, email) VALUES ('b9bb3977-9a89-4177-8fd2-7eb59d86fa81', 'Stephane', 'Nouvellon', 'stephane.nouvellon@gmail.com');