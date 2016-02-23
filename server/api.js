var appRouter = function(app) {
    app.get("/api/search", function(req, res) {
        var criteria = req.query.criteria;
        console.log( criteria );

        const employees = [
            {firstName: 'Foo', lastName: 'Bar', title: 'Master of the party'},
            {firstName: 'firstName', lastName: 'lastName', title: 'title'},
            {firstName: 'Allan', lastName: 'Wick', title: 'Software Craftsman'},
            {firstName: 'Johnny', lastName: 'Five', title: 'Cute Robot'},
            {firstName: 'Kris', lastName: 'Kringle', title: 'Present master'},
            {firstName: 'Oliver ', lastName: 'Queen', title: 'Bow Master'}
        ];

        const filtered = employees.filter( function( employee ) {
           return employee.firstName.toLowerCase().includes( criteria.toLowerCase() );
        });

        res.send(filtered);
    });
};

module.exports = appRouter;