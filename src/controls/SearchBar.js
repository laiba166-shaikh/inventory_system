import React, { useState } from 'react'
import SearchBar from "material-ui-search-bar";
import "./Css/searchbar.css"

const MySearchBar = ({searchValue,changeSearchValue,clearSearch}) => {
  // const [results, setResults] = useState();

  return (
    <div className="searchArea">
      <SearchBar
        className="search"
        value={searchValue}
        onChange={changeSearchValue}
        placeholder="Search..."
        onRequestSearch={()=>console.log("begin")}
        // closeIcon={
        //   <button className="closeIcon" onClick={clearSearch}>
        //     X
        //   </button>
        // }
      />
    </div>
  )
}

export default MySearchBar