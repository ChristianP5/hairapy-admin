document.addEventListener('DOMContentLoaded', async () => {
    console.log('Homepage Loaded');
    
    const accessToken = localStorage.getItem('accessToken');

    // Redirect to Login if accessToken doesn't exist
    if(!accessToken){
        window.location.href = '../login.html';
    }

    // Load Predictions
    const result = await fetch('/api/predicts', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })

    const data = await result.json();

    let predictions;

    try{
        predictions = data.data.predictions;
    }catch(error){
        localStorage.clear();
        window.location.href = '../login.html';
    }
    

    const predsTable = document.getElementById('preds-table');

    predictions.forEach(prediction => {
        const row = document.createElement('tr');

        // Filter to only show Predictions with ID
        if(prediction.id){

            let createdAt = prediction.createdAt;
            createdAt = createdAt.replace("T", " ");
            createdAt = createdAt.replace("Z", " ");

            console.log(createdAt);

            row.innerHTML = `<td><a class="pred-btn" href="/api/predicts/${prediction.id}">${prediction.id}</a></td><td><img width="300" src="${prediction.image}" alt=""></td><td>${prediction.result}</td><td>${prediction.confidenceScore}</td><td>${createdAt}</td>`;
            predsTable.appendChild(row);
        }
        
    })

    const predButtons = document.querySelectorAll('.pred-btn');
    predButtons.forEach(predButton => {
        predButton.addEventListener('click', async (event)=>{
            event.preventDefault();

            const targetEndpoint = predButton.getAttribute('href');

            const targetPredId = targetEndpoint.replace('/api/predicts/', "");

            const result = await fetch(targetEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                }
            })
            
            if(result.ok){
                localStorage.setItem('predId', targetPredId);
                window.location.href = '../pred-details.html';
            }else{
                window.alert(`${targetPredId} not found!`);
            }
            
        })
    })
    
})

