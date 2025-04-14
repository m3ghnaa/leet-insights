import React from "react";
import SearchComponent from "../components/SearchComponent";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <SearchComponent />
      </div>
    </>
  );
};

export default SearchPage;
