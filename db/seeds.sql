INSERT INTO departments(name) 
VALUES 
('Front-End Office'), 
('Back-End Division'),
('Full-Stack Unit'),
('Database Center'),
('Human Resources Service');

INSERT INTO roles(title, salary, department_id)
VALUES 
('HTML Engineer', 85000, 1),
('CSS Engineer', 80000, 1),
('ASP.NET Developer', 100000, 2),
('Express Developer', 100000, 2),
('MERN Manager', 150000, 3),
('MEAN Manager', 155000, 3),
('MySQL Designer', 95000, 4),
('MongoDb Designer', 97500, 4),
('Recruiter', 75000, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('AAA', 'aaa', 1, null),
('BBB', 'aaa', 2, 1),
('CCC', 'ccc', 3, null),
('DDD', 'ddd', 4, null),
('EEE', 'eee', 5, null),
('FFF', 'fff', 6, null),
('GGG', 'ggg', 7, 5),
('HHH', 'hhh', 8, 6),
('III', 'iii', 9, null),
('JJJ', 'jjj', 3, 6),
('LLL', 'lll', 4, 5);