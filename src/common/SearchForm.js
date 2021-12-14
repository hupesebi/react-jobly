import React, {useState} from "react";

const Search = ({query}) => {
    const [search, setSearch] = useState();

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        query(search);
        setSearch(search);
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="search"
                    placeholder = "Search"
                    value ={search}
                    onChange = {handleChange}
                    />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Search;