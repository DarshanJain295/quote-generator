const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

// show loading
function loading(){
    loader.hidden =false;
    quoteContainer.hidden=true;
}
//hide loading
function complete(){
    quoteContainer.hidden =false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    //getting new random quote
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent='Unknown';    }
    else{
        authorText.textContent=quote.author;    }
    //checking length of quote to determine styling
    if(quote.text.length > 80){
        quoteText.classList.add('long-quote');    }
    else {
        quoteText.classList.remove('long-quote');    }
    quoteText.textContent=quote.text;
    complete();
}

async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
        //catch error here
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl,'_blank');
}

//adding eventlisteners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();