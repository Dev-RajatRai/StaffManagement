import React from 'react'

import { useNavigate } from 'react-router-dom';
import Layout from '../Component/Layout/Layout';
import { UseSearch } from '../Contexts/SearchContext';

const Search = () => {

    const [value, setValue] = UseSearch();
    const navigate = useNavigate();
    return (

        <Layout title={"Search Product Ecommerce-app"}>
            <div className="container">
                <div className="text-center d-flex similar-products
                flex-wrap">
                    {value?.results.map((p) => (
                        < div className="card m-2" key={p?._id} style={{ width: "18rem" }}>

                            <div className="card-body">
                                <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                                <p className="card-text">{p.department}</p>

                            </div>
                            <div className="btn">
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/employee/${p.slug}`)}>More Details </button>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>

    )
}

export default Search