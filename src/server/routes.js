const {
    getRootHandler, getLostHandler, postLoginHandler,
    getPredictsHandler, getPredictByIdHandler,
    getArticlesByIdHandler
} = require('./handler');

const path = require('path');

const routes = [
    {
        path: '/',
        method: 'GET',
        handler: getRootHandler,
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.join(__dirname, 'public'),
                index: ['index.html']
            }
        }
    },
    {
        path: '/api/login',
        method: 'POST',
        handler: postLoginHandler,
    },
    {
        path: '/api/predicts',
        method: 'GET',
        handler: getPredictsHandler,
    },
    {
        path: '/api/predicts/{id}',
        method: 'GET',
        handler: getPredictByIdHandler,
    },
    {
        path: '/api/articles',
        method: 'GET',
        handler: getArticlesByIdHandler,
    },
    {
        path: '/{any*}',
        method: '*',
        handler: getLostHandler,
    }
]

module.exports = routes