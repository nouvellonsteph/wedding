DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS updates;
CREATE TABLE IF NOT EXISTS guests (
    guestId VARCHAR(50) PRIMARY KEY,
    lastUpdated DATE,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    rsvp INTEGER,
    brunch INTEGER,
    children INTEGER,
    foodRestriction TEXT,
    accompany TEXT,
    accompanyFirstName TEXT,
    accompanyLastName TEXT
);

CREATE TABLE IF NOT EXISTS updates (
    uuid VARCHAR(50) PRIMARY KEY,
    createdAt DATE,
    firstName TEXT,
    lastName TEXT,
    rsvp INTEGER,
    email TEXT,
    phone TEXT,
    brunch INTEGER,
    children INTEGER,
    foodRestriction TEXT,
    accompany TEXT,
    accompanyFirstName TEXT,
    accompanyLastName TEXT,
  	guestId VARCHAR(50),
    FOREIGN KEY(guestId) REFERENCES guests(guestId) ON DELETE CASCADE
);

INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('b115ce7f-bc96-4106-920c-e93eeefebdb4', 'Caroline', 'Nouvellon', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('44dde185-ade2-4570-bcd1-f5f6a6106ea2', 'Julien', 'Nouvellon', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('4f35fbad-ef20-43b6-829a-d2af4b9881db', 'Thomas', 'Nouvellon', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('84554b78-93d9-45c8-b46e-8c187efe8b27', 'Myriam', 'Kessas', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('77e934ab-9c97-480a-9972-e38c656791e4', 'Chantal', 'Nouvellon', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('754e6550-0ce3-4d93-a840-0a2f4f23386d', 'Jean', 'Lebraud', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('1df0f9fa-8789-4654-abf2-193ff82da7c9', 'Gilles', 'Guillory', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('fbceee6f-4b4a-4921-baa4-cadc6ccdd349', 'Perrine', 'Guillory', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('ebe5bc37-5e3f-4dae-8cce-77c1cd5b6c63', 'Chloé', 'Guillory', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('08077b2e-ceb7-4c5f-a743-c85018a47e43', 'Véronique', 'Lebraud', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('1a02cfc6-9bda-4732-bdb4-3bbf2ffd0355', 'Marie', 'Chomel', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('29a6e7b1-591c-4589-8d96-5b8d000993ff', 'Claire', 'Chomel', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('0a18109d-0f2c-46fe-8dee-68abdf4426c8', 'Romain', 'Manero', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('b0e3397f-6036-47d5-a2e3-8af09667061d', 'Maxime', 'Arnaud', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('2d10d60a-9410-4894-b96f-e1c3a1f3b570', 'Matthieu', 'Danciu', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('657e5497-9074-47a8-ba69-d52c284086f3', 'Clara', 'Neves', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('8e209e72-3441-462d-9373-99fde4f5f138', 'Emmanuelle', 'Curiant', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('1aa332e1-b814-4d61-9baf-6d028ca9f42e', 'Juan', 'David', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('0aaf8a3d-be2a-40a8-9ee9-7ddd341075e6', 'Amine', 'Zeitouni', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('99e0c189-b5a4-41ce-81b5-525fb5e80db9', 'Adelaide', 'Courtois', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('8c5ded6e-409e-49ff-b1f2-55c6cc2ed240', 'Aurelien', 'Decros', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('ff13b7c3-d19a-4710-8590-129264bc8241', 'Carlos', 'Palero', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('c4ecda88-b9fc-4bb4-97ed-aa71372d6a49', 'Carlos', 'Ragattero', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('cec4b136-a497-4e52-8ba8-220f2ab4a393', 'Guillaume', 'Danobrega', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('d6f1875d-26a2-4688-883e-39175b9c058d', 'Guillaume', 'Fenollar', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('3457f643-3164-4698-b8e4-812a86ddd3b5', 'Christelle', 'Benon', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('b7e4c4ba-f66f-43f1-9d46-8e71d01b1da3', 'Mickael', 'Lambert', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('1b3a4060-ab20-40b3-ba66-c16b6962fd81', 'Colin', 'Leti', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('e276c586-68fa-4d8d-87f4-30a0682ef5bc', 'Alice', 'Shechtman', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('e624f615-db45-4c15-a3dc-06de7a029c90', 'Sasha', 'Shechtman', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('9040c0b8-7577-4f7d-82ca-f36bf82a9e9b', 'Iris', 'Vivante', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('6fc0e4b4-5734-4f5e-bb49-ee5e38115558', 'Sasha', 'Gornak', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('a9638306-cd08-44b3-b45b-2191d8409fa7', 'Jack', 'Stewart', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('bfc740e2-8ea8-4e00-afd1-f300ebd41a97', 'Kasia', 'Pieterzak', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('91a4916d-b1a4-4849-b7f3-42d0e4c9cf9e', 'Baptiste', 'Descateaux', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('9a91032b-1c48-4155-849d-5cd366208149', 'Dana', 'Dagan', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('5b80f1d5-1b83-4920-96f0-d178f2f66374', 'Ludmila', 'Kushnir', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('5e7e5022-fa3b-4308-9bf1-916a4c5bbee3', 'Sebastien', 'Scherl', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('4a2511d6-58a4-4510-9abb-2d0c47530ced', 'Michal', 'Lobanov', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('d4a290e6-aed8-4962-8d1b-d27f4452a5b3', 'Ariel', 'Drizin', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('250c2c7d-3199-4ca0-ad87-b56148331bb7', 'Yuval', 'Freilich', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('b3544bb2-b35f-4018-9819-4dfdaad54e37', 'Michele', 'Maioli', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('f2304120-5b85-40fc-811b-c466821267d2', 'Omer', 'Shafir', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('7e7fc185-8440-4e85-8600-d5c8f529e98f', 'Nir', 'Blass', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('08fb0ab7-1136-4846-ac51-00c92eaf8bdc', 'Kirill', 'Polonsky', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('aeeb7b83-0f71-4c41-aa55-916e57a7f87d', 'Linda', 'Vivante', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('1921e504-792b-483c-a880-5b08236aa0e3', 'Vika', 'Shych', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('d85af502-9b14-4c71-b02f-f2f7482f4fc1', 'Ira', 'Dozortzev', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('a775b355-e1a9-4432-b1b0-556d3482b9c0', 'Olga', 'Selovyeva', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('f5a0d833-2191-4b23-85eb-6f5b60f7782d', 'Alex', 'Devaucleroy', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('dbb0d186-c292-4cab-a8eb-608f7d823315', 'Tom', 'Mann', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('44f96611-df19-4feb-8d15-00cdfac12121', 'Lior', 'Elezra', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('deec720c-291b-47b0-b39f-d22cb51a30cc', 'Ali', 'Aboudoma', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('5cf1d0a9-f5fc-459e-86a1-a8b7bd03037f', 'Maria', 'Timofeeva', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('39251623-77c5-46f9-b755-8091285c4f0f', 'Pasha', 'Evdokimov', 'false', 'false', 0, 'false');
INSERT INTO guests (guestId, firstName, lastName, rsvp, brunch, children, accompany) VALUES ('dd2746d2-116d-42d7-ac87-e8834b5c3c15', 'Nicole', 'Tal', 'false', 'false', 0, 'false');
