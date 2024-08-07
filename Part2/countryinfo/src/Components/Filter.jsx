const Filter = ({ searchText, handleFilter }) => {
    return (
        <div>
            find countries <input value={searchText} onChange={handleFilter}></input>
        </div>
    )
}

export default Filter;