export default function Filter({searchTerm, handleFilter, handleSearch}) {
    return (
        <>
            <div className="filter">
                <div className="container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            placeholder="Search for country..."
                            defaultValue={searchTerm}
                        />
                    </form>

                    <select onChange={handleFilter} defaultValue={'DEFAULT'} >
                        <option value={'DEFAULT'} hidden>Filter by Region</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>

                </div>
            </div>
        </>
    )
}