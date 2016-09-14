const filter = (employees, criteria) => {
    return employees.filter(function (employee) {
        return employee.firstName.toLowerCase().includes(criteria.toLowerCase());
    })
};

export default {
    filter
};