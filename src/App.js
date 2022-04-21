import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [articles, setArticles] = useState(null);
  const [results, setResults] = useState(true);

  function handleClick(event) {
    event.preventDefault();
     // console.log('I was clicked');
     // console.log(event);
     // console.log(document.querySelector('input').value);
     fetch(`https://hn.algolia.com/api/v1/search?query=${document.querySelector('input').value}&hitsPerPage=80`)
     .then((res)=>res.json())
     .then((data)=> {setArticles(data.hits);;
      console.log(data.hits);
      data.hits.length > 0 ? (setResults(true)) : (setResults(false));
      console.log(results)})
     .catch((error) => alert(error)); 

     document.querySelector('input').value='';
  };


   useEffect(() => {
     fetch("https://hn.algolia.com/api/v1/search?query=react&hitsPerPage=80")
       .then((res) => res.json())
       .then((data) => {
         //console.log(data.hits);
         setArticles(data.hits);
         setResults(true);
       })
       .catch((error) =>  alert(error));
   }, []);


  return (
<>
    <div className="App">
    <h1 className='heading'>Hacker News</h1>
    <div className='allArticles search'>
    <form>
    <input type='text' placeholder='What are you looking for...' className='searchBar form-control'></input>
    <button className='button btn btn-dark' onClick={handleClick}>Search</button>
    </form>
    </div>
    <div className='allArticles'>
      {/* Conditional Rendering mit ternary operator:
      Wenn "articles" truthy ist (also einen Wert hat)
      wollen wir das div mit den Inhalten aus der Response zeigen
      andernfalls zeige den String "Loading" */}
      {articles
        ? articles.map((article) => (
          <>
            <div key={article.objectID} className='articleDiv'>
              <h3  className='articleHeader'>{article.title}</h3>
              <p className='articleAuthor'>by {article.author}</p>
              <p className='articleLink'><a href={article.url}><button className='btn btn-dark'>Read the Article</button></a></p>
              <p className='articleAuthor'>{article.created_at}</p>              
            </div>            
            <br></br>
            </>
          ))
        : <div key='loading' className='articleNoResultt'>
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Fetching Articles...
        </h3>      
          </div>}
          {results 
          ? <div className='articleDiv'> <h5>We hope you enjoyed your stay!</h5></div> 
          : <div className='articleNoResult'><h5>We could not find what you were looking for!</h5></div> }
      </div>
    </div>  
    </>
  );
}

export default App;





// Level 1---x done
// # Load mock news from a JSON file (json file here);
//  or load news directly from the HN API about a pre-set topic (e.g: React)---x

    //in console .url delivers the respective link to the article, use anchors!---x

// # When this is done and working, create a search bar,
//  and allow the user to search for any topic (search input + “Search” button)---x

        // search bar: input field, submit button -> form---x
        // use new state, initially 'null', if content (truthy) render corresponding search items instead
        // of initial 'react' search from useEffect. -> ternary logic ---x solved via initial useState

    // state/effect statements for fetching the api/rendering---x
    // ternary operator to show either loading or site---x
    // nested ternary so either site or something else shows?---x solved via initial useState

// (Bonus) Level 2:
// # Display a spinner or a loading message when the news are being fetched----x
// # Handle the scenario where no news match the user search---x
// # Handle potential errors from the API and alert the user---x

// (Bonus) Level 3:
// # Implement pagination

// (Bonus) Level 4:
// # Use a library of UI components to create your news site
//  (such as React Semantic UI, Material UI, React Bootstrap, Reactstrap)


