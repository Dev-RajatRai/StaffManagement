import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [employee, setEmployee] = useState({
        keyword: '',
        results: []
    });
    return (
        <SearchContext.Provider value={[employee, setEmployee]}>
            {children}
        </SearchContext.Provider>
    )
}


const UseSearch = () => useContext(SearchContext);

export { UseSearch, SearchProvider }
