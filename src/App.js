import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [articles, setArticles] = useState(null);


  function handleClick(event) {
    event.preventDefault();
    //console.log('I was clicked');
      //console.log(event);
     // console.log(document.querySelector('input').value);

     fetch(`https://hn.algolia.com/api/v1/search?query=${document.querySelector('input').value}`)
     .then((res)=>res.json())
     .then((data)=> {setArticles(data.hits);
      console.log(data.hits);})     
  };


   useEffect(() => {
     fetch("https://hn.algolia.com/api/v1/search?query=react")
       .then((res) => res.json())
       .then((data) => {
         //console.log(data.hits);
         setArticles(data.hits);
       })
       .catch((err) => console.log(err));
   }, []);


  return (
<>
    <div className="App">
    <h1 className='heading'>Hacker News</h1>
    <div className='allArticles search'>
    <form>
    <input type='text' placeholder='What are you looking for...' className='searchBar form-control'></input>
    <button className='button btn btn-dark' onClick={handleClick}>Submit search</button>
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
              <h3 className='articleHeader'>{article.title}</h3>
              <p className='articleAuthor'>by {article.author}</p>
              <p className='articleLink'><a href={article.url}><button className='btn btn-dark'>Read the Article</button></a></p>
              
            </div>
            <br></br>
            </>
          ))
        : "Loading....."}
      </div>

    {/* old code below */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
// Task: figure out where to put bootstrap links so you can override/ which css to edit

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
// # Display a spinner or a loading message when the news are being fetched
// # Handle the scenario where no news match the user search
// # Handle potential errors from the API and alert the user

// (Bonus) Level 3:
// # Implement pagination

// (Bonus) Level 4:
// # Use a library of UI components to create your news site
//  (such as React Semantic UI, Material UI, React Bootstrap, Reactstrap)