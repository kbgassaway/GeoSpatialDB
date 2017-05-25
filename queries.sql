SELECT first_name, last_name, job_title, city, cert_name FROM employees e
LEFT JOIN offices o ON o.id = e.office
LEFT JOIN employee_cert ec ON ec.eid=e.id
LEFT JOIN certifications c ON c.id=ec.cid;