const getRootHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        message: 'Welcome to Root!',
    })

    response.code(200);

    return response;
}

const getLostHandler = (request, h) => {
    const response = h.response({
        status: 'fail',
        message: 'Welcome to the Service, but you seem to be Lost!',
    })

    response.code(404);

    return response;
}

const postLoginHandler = async (request, h) => {

        const {default: fetch} = await import('node-fetch');
        
        const targetEndpoint = `${process.env.BASE_URL}/api/login`;

        const body = JSON.stringify(request.payload);

        const result = await fetch(targetEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer `, // Ensure this token is correct if needed
            },
            body: body
        });

        const data = await result.json();

        const response = h.response({
            ...data,
        })

        response.code(result.status);

        return response;
}

const getPredictsHandler = async (request, h) => {
    const header = request.headers;

    const accessToken = header['authorization'].split(' ')[1];

    const {default: fetch} = await import('node-fetch');

    const targetEndpoint = `${process.env.BASE_URL}/api/predicts`;

        const result = await fetch(targetEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Ensure this token is correct if needed
            },
        });

        const data = await result.json();

        const response = h.response({
            ...data,
        })

        response.code(200);

        return response;
    
}

const getPredictByIdHandler = async (request, h) => {
    const { id } = request.params;


    const targetEndpoint = `${process.env.BASE_URL}/api/predicts/${id}`;

    const header = request.headers;
    const accessToken = header['authorization'].split(' ')[1];

    const { default: fetch } = await import('node-fetch');

    const result = await fetch(targetEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Ensure this token is correct if needed
        }
    })

    const data =  await result.json();
    
    const response = h.response({
        ...data,
    })

    response.code(200);

    return response;
}

const getArticlesByIdHandler = async (request, h) => {
    const header = request.headers;

    const accessToken = header['authorization'].split(' ')[1];

    const {default: fetch} = await import('node-fetch');

    const targetEndpoint = `${process.env.BASE_URL}/api/articles`;

        const result = await fetch(targetEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Ensure this token is correct if needed
            },
        });

        const data = await result.json();

        const response = h.response({
            ...data,
        })

        response.code(200);

        return response;
}

module.exports = {
    getRootHandler, getLostHandler,
    postLoginHandler, getPredictsHandler,
    getPredictByIdHandler, getArticlesByIdHandler
}