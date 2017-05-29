SELECT first_name, last_name, job_title, city, cert_name FROM employees e
LEFT JOIN offices o ON o.id = e.office
LEFT JOIN employee_cert ec ON ec.eid=e.id
LEFT JOIN certifications c ON c.id=ec.cid;




--Select the employee data and the city the employee is associated with
SELECT first_name, last_name, job_title, department, salary, city FROM employees e
LEFT JOIN offices o ON e.office= o.id; 
