INSERT INTO departments(name) 
VALUES 
('Front-End'), 
('Back-End'),
('Full-Stack'),
('Database'),
('Human Resources');

INSERT INTO roles(title, salary, department_id)
VALUES 
('HTML', 85000, 1),
('CSS', 80000, 1),
('ASP.NET', 100000, 2),
('Express', 100000, 2),
('MERN', 150000, 3),
('MEAN', 155000, 3),
('MySQL', 95000, 4),
('MongoDb', 97500, 4),
('Recruiter', 75000, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('AAA', 'aaa', 1, null),
('BBB', 'aaa', 2, 1),
('CCC', 'ccc', 3, null),
('DDD', 'ddd', 4, null),
('EEE', 'eee', 5, null),
('FFF', 'fff', 6, null),
('GGG', 'ggg', 7, 6),
('HHH', 'hhh', 8, 5),
('III', 'iii', 9, null);