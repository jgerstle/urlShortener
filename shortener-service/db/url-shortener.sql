CREATE TABLE IF NOT EXISTS url
(
    id   BIGSERIAL PRIMARY KEY,
    url  TEXT,
    uuid uuid
);
