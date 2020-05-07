import React, {useState} from 'react';
import s from './Paginator.module.css'

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10}) => {
    let pages = [];
    let pagesNumber = Math.ceil(totalItemsCount / pageSize);

    for (let i = 1; i <= pagesNumber; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesNumber / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
                return <span className={currentPage === p && s.pageSelected} onClick={() => {
                    onPageChange(p)
                }}> {p} </span>
            })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }

        </div>

    );
};


export default Paginator;