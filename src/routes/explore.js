import React, { useState} from 'react'
import BookTile from '../components/bookTile';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../components/axios';
import Filter from '../components/filter';


export default function Explore(){
    document.title = "Explore | Audible";
    const [books,setBooks] = useState();
    const [error,setError] = useState("");
    let initialSelection = {
        categories: [
            {
                title: "fiction",
                selected: false
            },
            {
                title: "non-fiction",
                selected: false
            },
            {
                title: "religious",
                selected: false
            }
        ],
        genres: [
            {
                title: "Psychological",
                selected: false
            },
            {
                title: "Saga",
                selected: false
            },
            {
                title: "Historical",
                selected: false
            },
            {
                title: "Alternate History",
                selected: false
            },
            {
                title: "Fantasy",
                selected: false
            },
            {
                title: "High Fantasy",
                selected: false
            },
            {
                title: "Mithic",
                selected: false
            },
            {
                title: "Business",
                selected: false
            },
            {
                title: "Motivation",
                selected: false
            },
            {
                title: "Horror Comics",
                selected: false
            },
            {
                title: "Dark Comedy",
                selected: false
            },
            {
                title: "Dark fantasy",
                selected: false
            },
            {
                title: "Mystery",
                selected: false
            },
            {
                title: "Thriller",
                selected: false
            },
            {
                title: "Crime Film",
                selected: false
            },
            {
                title: "Horror",
                selected: false
            },
            {
                title: "Adventure",
                selected: false
            },
            {
                title: "Drama",
                selected: false
            },
            {
                title: "Quest",
                selected: false
            },
            {
                title: "Novel",
                selected: false
            },
            {
                title: "Self-help",
                selected: false
            },
            {
                title: "Sci-Fi",
                selected: false
            }
        ],
        programTypes:[
            {
                title: "Article",
                selected: false
            },
            {
                title: "Audio-Book",
                selected: false
            },
            {
                title: "Episode",
                selected: false
            },
            {
                title: "Hypnosis",
                selected: false
            },
            {
                title: "Language Learning",
                selected: false
            },
            {
                title: "Lecture",
                selected: false
            },
            {
                title: "Meditation",
                selected: false
            },
            {
                title: "Newspaper & Magazine",
                selected: false
            },
            {
                title: "Performance",
                selected: false
            },
            {
                title: "Periodical",
                selected: false
            },
            {
                title: "Radio & TV Program",
                selected: false
            },
            {
                title: "Sermon",
                selected: false
            },
            {
                title: "Show",
                selected: false
            },
            {
                title: "Speech",
                selected: false
            },
            {
                title: "Walking Tour",
                selected: false
            },
        ],
        languages: [
            {
                title: "English",
                selected: false
            },
            {
                title: "Hindi",
                selected: false
            }
        ]
    }
    const [categories, setCategories] = useState(initialSelection.categories);
    const [genres,setGenres] = useState(initialSelection.genres);
    const [programTypes,setProgramTypes] = useState(initialSelection.programTypes);
    const [languages,setLanguages] = useState(initialSelection.languages);

    function fetchBooks() {
        console.log("fetch called");
        axios.post("/books",
            {
                languages: languages,
                categories: categories,
                genres: genres,
                programTypes: programTypes
            }).then(response => {
                setError("");
                setBooks(response.data);
            }).catch(error => {
                setError("Something Went Wrong!!!");
            });
    }
    React.useEffect(()=>{
        if(books===undefined){
            fetchBooks();
        }
    });
    function handleCategoryChange(state) {
        let newState = Object.assign([], state);
        setCategories(newState);
        fetchBooks();
        return true;
    }
    const handleLanguageChange = (state) => {
        let newState = Object.assign([], state);
        setLanguages(newState);
        fetchBooks();
        return;
    }
    const handleGenreChange = (state) => {
        let newState = Object.assign([], state);
        setGenres(newState);
        fetchBooks();
        return;
    }
    const handleProgramTypeChange = (state) => {
        let newState = Object.assign([], state);
        setProgramTypes(newState);
        fetchBooks();
        return;
    }
    let bookJSX;
    
    
    if(error !== ""){
        bookJSX  = (  
            <div className = "explore-error">
                {error}
            </div>
        );
    }
    else if(books === undefined){
        bookJSX=(
            <Spinner animation="border" variant="warning" />
        );
    }
    else if(books.length===0){
        bookJSX =(
            <div className="explore-error">
                Hang tight, we will have it soon!
            </div>
        );
    }
    else{
        bookJSX = (
            <div>
                {books.map(book => <BookTile key={book._id} book={book} />)}
            </div> 

        );
    }
    return(
        <div>
            <div className="explore-body">
                <div className="explore-body-filter">
                    <Filter title="Category" categories={categories} changeState={(newState) => handleCategoryChange(newState)} reset={() => handleCategoryChange(initialSelection.categories)}/>
                    <Filter title="Language" categories={languages} changeState={(newState) => handleLanguageChange(newState)} reset={() => handleLanguageChange(initialSelection.languages)}/>
                    <Filter title = "Genre" categories={genres} changeState = {(newState)=>handleGenreChange(newState)} reset={()=>handleGenreChange(initialSelection.genres)} />
                    <Filter title="Program Type" categories={programTypes} changeState={(newState) => handleProgramTypeChange(newState)} reset={() => handleProgramTypeChange(initialSelection.programTypes)} />
                </div>
                <div className ="explore-body-books">
                    {bookJSX}
                </div>
            </div>
        </div>
    );
}

