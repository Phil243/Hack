import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [articles, setArticles] = useState(null);


   useEffect(() => {
     fetch("https://hn.algolia.com/api/v1/search?query=react")
       .then((res) => res.json())
       .then((data) => {
         console.log(data.hits);
         setArticles(data.hits);
       })
       .catch((err) => console.log(err));
   }, []);


  return (
<>


    <div className="App">
    <h1>Ahoy!</h1>

    <h1>Let's fetch</h1>
      {/* Conditional Rendering mit ternary operator:
      Wenn "articles" truthy ist (also einen Wert hat)
      wollen wir das div mit den Inhalten aus der Response zeigen
      andernfalls zeige den String "Loading" */}
      {articles
        ? articles.map((article) => (
            <div key={article.objectID}>
              <h2>{article.title}</h2>
              <p>{article.author}</p>
            </div>
          ))
        : "Loading....."}


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


// Level 1
// # Load mock news from a JSON file (json file here);
//  or load news directly from the HN API about a pre-set topic (e.g: React)
// # When this is done and working, create a search bar,
//  and allow the user to search for any topic (search input + “Search” button)

    // state/effect statements for fetching the api/rendering
    // ternary operator to show either loading or site
    // nested ternary so either site or something else shows?

// (Bonus) Level 2:
// # Display a spinner or a loading message when the news are being fetched
// # Handle the scenario where no news match the user search
// # Handle potential errors from the API and alert the user

// (Bonus) Level 3:
// # Implement pagination

// (Bonus) Level 4:
// # Use a library of UI components to create your news site
//  (such as React Semantic UI, Material UI, React Bootstrap, Reactstrap)