import React from 'react'
import { UseSearch } from '../../Contexts/SearchContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Search = () => {
    const [value, setValue] = UseSearch();
    const navigate = useNavigate();

    const SerchSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/employee/search/${value.keyword}`);
            setValue({ ...value, results: data });
            navigate("/search")
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong")
        }
    }
    return (
        <>
            <form className="d-flex" role="search" onSubmit={SerchSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value.keyword}
                    onChange={(e) => setValue({ ...value, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </>
    )
}

export default Search
