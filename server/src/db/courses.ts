const courseTable = `
  DROP TABLE IF EXISTS courses CASCADE;

  CREATE TABLE courses (
    course_id serial PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

export default courseTable;
