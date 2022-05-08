CREATE PROCEDURE getTodo(@id VARCHAR)
AS
BEGIN
SELECT id, title, description, duedate FROM todoTable WHERE id=@id

END