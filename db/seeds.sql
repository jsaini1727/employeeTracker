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
    ('Sales Lead', 100000, 5),
    ('Salesperson', 80000, 5),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('HR Manager', 90000, 4),
    ('HR advisor', 75000, 4),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3);

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
    ('Ramesh', 'Broad', 5,  NULL),
    ('Manisha', 'Gani', 6, 5),
    ('Vicky', 'Bing', 7, null),
    ('Mandira', 'Geller', 8, 7),
    ('Sony', 'Buffay', 9, null),
    ('Samira', 'Banden', 10, 9);

    