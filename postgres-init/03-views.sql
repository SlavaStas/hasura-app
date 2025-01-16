CREATE OR REPLACE VIEW search_images AS
SELECT
    i.id AS image_id,
    i.url AS image_url,
    i.status,
    i.created_at,
    c.name AS collection_name,
    t.name AS tag_name,
    a.email AS author_email
FROM image i
JOIN collection c ON i.collection_id = c.id
LEFT JOIN image_tag it ON i.id = it.image_id
LEFT JOIN tag t ON it.tag_id = t.id
JOIN author a ON i.author_id = a.id;
