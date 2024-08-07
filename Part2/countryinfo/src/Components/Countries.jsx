const Countries = ({ countries, handleSelect }) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    if (countries.length > 1) {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.id}>
                        {country.name} <button onClick={() => handleSelect(country.id)}>show</button>
                    </li>
                ))}
            </ul>
        );
    }
    return null;
}

export default Countries;