const API_KEY="fc627cb2b09e4c87b6207597b17623ff";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    // console.log(data);
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    });
}

let CurSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    CurSelectedNav?.classList.remove('active');
    CurSelectedNav=navItem;
    CurSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if (!query) return;
    fetchNews(query);
    CurSelectedNav?.classList.remove('active');
    CurSelectedNav=null;
})
