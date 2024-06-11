document.addEventListener('DOMContentLoaded', async () => {
    
    const accessToken = localStorage.getItem('accessToken');
    
    const targetPredId = localStorage.getItem('predId');

    if(!targetPredId){
        window.location.href = '../home.html';
    }

    const targetEndpoint = `/api/predicts/${targetPredId}`;
    
    const result = await fetch(targetEndpoint, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    })

    const data = await result.json();

    let prediction;
    try{
        prediction = data.data.prediction;
        if(!prediction){
            throw new Error();
        }
    }catch(error){
        localStorage.clear();
        window.location.href ='../login.html';
    }

    const {
        image: prediction_image,
        result: prediction_result,
        confidenceScore: prediction_conf,
        recomendations: prediction_recs,
        id: prediction_id,
        ingredients: prediction_ing,
        createdAt: prediction_date,
    }  = prediction;

    const pred_image_em = document.querySelector('img');
    pred_image_em.setAttribute('src', prediction_image);

    const pred_result_em = document.querySelector('h1');
    pred_result_em.textContent = `Result: ${prediction_result}`;

    const  pred_conf_em = document.getElementById('confidence-score');
    pred_conf_em.textContent = `${prediction_conf}%`;

    const pred_date_em = document.getElementById('createdAt');
    pred_date_em.textContent = prediction_date;


})