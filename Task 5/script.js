
const contentContainer = document.getElementById('content');
const fetchNewsBtn = document.getElementById('fetchNews');
const NEWS_API_KEY = '9947d0b1ae7041df94a7cd0045da8d12'; 
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + NEWS_API_KEY;

function showLoading() {
    contentContainer.innerHTML = '<div class="loading">Loading latest news...</div>';
}


function handleError(error) {
    contentContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
}

function createNewsCard(article) {
    return `
        <div class="card">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="${article.title}" class="news-image">
            <p>${article.description || 'No description available'}</p>
            <p><strong>Source:</strong> ${article.source.name}</p>
            <p><strong>Published:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
            <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        </div>
    `;
}


async function fetchNews() {
    try {
        showLoading();
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            contentContainer.innerHTML = data.articles.map(createNewsCard).join('');
        } else {
            contentContainer.innerHTML = '<div class="no-news">No news articles found.</div>';
        }
    } catch (error) {
        handleError(error);
    }
}

fetchNewsBtn.addEventListener('click', fetchNews); 