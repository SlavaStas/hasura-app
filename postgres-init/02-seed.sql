INSERT INTO author (email, role) VALUES
('admin@example.com', 'admin'),
('author1@example.com', 'author'),
('author2@example.com', 'author');

INSERT INTO collection (name) VALUES
('Nature'),
('Technology'),
('Art');

INSERT INTO image (url, author_id, status, collection_id) VALUES
('https://example.com/image1.jpg', (SELECT id FROM author WHERE email = 'author1@example.com'), 'published', (SELECT id FROM collection WHERE name = 'Nature')),
('https://example.com/image2.jpg', (SELECT id FROM author WHERE email = 'author2@example.com'), 'draft', (SELECT id FROM collection WHERE name = 'Technology'));

INSERT INTO tag (name) VALUES
('landscape'),
('portrait'),
('abstract');

INSERT INTO image_tag (image_id, tag_id) VALUES
((SELECT id FROM image WHERE url = 'https://example.com/image1.jpg'), (SELECT id FROM tag WHERE name = 'landscape')),
((SELECT id FROM image WHERE url = 'https://example.com/image1.jpg'), (SELECT id FROM tag WHERE name = 'portrait'));
