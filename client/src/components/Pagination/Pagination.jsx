import React from "react";
import "./Pagination.css"

export default ({ pokesPerPage, pokes, paginado, currentPage }) => {
    const pageNum = [];

    for (let i = 1; i <= Math.ceil(pokes / pokesPerPage); i++) {
        pageNum.push(i)
    }
    


    return (
        <div className="paginado">
            
               
                    {pageNum && pageNum.map((num, i) => (
                        
                            <a className={`${num === (currentPage) ? "paginado-actual": "paginado-off"}`} key={i} onClick={() => paginado(num)}>{num}</a>
                        
                    ))}
                
           
        </div>
    )
}