import React from 'react';

function SearchInput() {
    return (
        <input
            type={"text"} 
            className="outline-0 bg-[rgb(247,247,247)] dark:bg-[#3A2178] shadow-lg text-black dark:text-white text-sm pl-12 px-4 rounded-full h-11 w-48 duration-100 focus:w-64 searchInput"
            placeholder="Serach Anything..."
        />
    );
}

export default SearchInput;