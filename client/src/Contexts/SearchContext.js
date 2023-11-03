import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [product, setProduct] = useState({
        keyword: '',
        results: []
    });
    return (
        <SearchContext.Provider value={[product, setProduct]}>
            {children}
        </SearchContext.Provider>
    )
}


const UseSearch = () => useContext(SearchContext);

export { UseSearch, SearchProvider }
