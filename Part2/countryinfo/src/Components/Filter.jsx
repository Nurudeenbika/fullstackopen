const Filter = ({ searchText, handleCountryFilter }) => {
    return (
        <div>
            find countries <input value={searchText} onChange={handleCountryFilter}></input>
        </div>
    )
}

export default Filter;