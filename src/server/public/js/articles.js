document.addEventListener('DOMContentLoaded', async () => {
    console.log('Homepage Loaded');
    
    const accessToken = localStorage.getItem('accessToken');

    // Redirect to Login if accessToken doesn't exist
    if(!accessToken){
        window.location.href = '../login.html';
    }

    // Load Articles
    const result = await fetch('/api/articles', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })

    const data = await result.json();

    console.log(data);

    let articles;

    try{
        articles = data.data.articles;

        if(!articles){
            throw new Error();
        }

    }catch(error){
        localStorage.clear();
        window.location.href = '../login.html';
    }
    
    const articlesTable = document.getElementById('articles-table');

    articles.forEach(article => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${article.id}</td>
            <td><img src=${article.image_url} alt="" width="300"></td>
            <td>${article.title}</td>
            <td>${article.content}</td>
            <td>${article.createdAt}</td>`
        
            articlesTable.appendChild(row);
    })
    
})

