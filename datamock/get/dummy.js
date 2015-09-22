module.exports = {
    path: '/dummy/:id?',
    template: {
        id: function(params) {
            return params.id || 1;
        },
        username: 'Steve',
        password: 'Jobs',
        status: 'OK'
    }
};
