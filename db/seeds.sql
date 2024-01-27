INSERT INTO
    department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Human Resources'),
    ('Sales');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 4),
    ('Accountant', 125000, 4),
    ('HR Manager', 90000, 2),
    ('HR advisor', 75000, 2),
    ('Legal Team Lead', 250000, 5),
    ('Lawyer', 190000, 5);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES
    ('Arvind', 'Green', 1, null),
    ('Rathor', 'Centralperk', 2, 1),
    ('Manish', 'Heller', 3, null),
    ('Viany', 'Tribbiani', 4, 3),
    ('Ramesh', 'Broad', 5, 1),
    ('Manisha', 'Gani', 6, 3),
    ('Vicky', 'Bing', 7, null),
    ('Mandira', 'Geller', 8, 7),
    ('Sony', 'Buffay', 9, null),
    ('Samira', 'Banden', 10, 9);