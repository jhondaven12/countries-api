import axios from "axios";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import CountryList from "./country";
import Filter from "../../components/filter";
import ReactPaginate from "react-paginate";
import Loading from "../../components/loading";

function Home({ data }) {
  const [countries, setCountries] = useState(data);
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  //Search Filter
  const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = event.target.search.value;
    setSearchTerm(inputValue);

    // Filter countries based on searchTerm and current filter
    const filteredCountries = data.filter(item =>
      (item.name.toLowerCase().includes(inputValue.toLowerCase())) &&
      (filter === '' || item.region === filter)
    );
    setCountries(filteredCountries);
  }

  //Selected filter
  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCurrentPage(0);
    
    // Filter countries based on current filter and searchTerm
    const filteredCountries = data.filter(item =>
      (event.target.value === 'DEFAULT' || item.region === event.target.value) &&
      (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setCountries(filteredCountries);
  }

  //Pagination
  const itemPerPages = 20;
  const startOffet = currentPage * itemPerPages
  const endOffset = startOffet + itemPerPages;
  const currentItems = countries.slice(startOffet, endOffset);
  const totalPages = Math.ceil(countries.length / itemPerPages);

  const handlePageClick = (selected) => {
    if (selected.selected !== currentPage) {
      setLoading(true);
      setCurrentPage(selected.selected);
    }
  }

  useEffect(() => {
    // Simulate fetching data when data prop changes (replace with actual API call)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentPage]); // Watch currentPage changes

  useEffect(() => {
    // Simulate fetching data when data prop changes (replace with actual API call)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [countries]); // Watch data changes

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(0);
  }, [countries]);

  return (
    <>
      <Filter searchTerm={searchTerm} handleFilter={handleFilter} handleSearch={handleSearch} />

      {loading ? (
        <Loading/>
      ) : (
        <CountryList countries={currentItems} />
      )}

      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={null}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const page = 1; // Spceify the current page
    const limit = 20; // Specify the number of tiems per page
    const apiUrl ='https://jhondaven12.github.io/entertaimentApi/countries.json';

    const response = await axios.get(`${apiUrl}?page=${page}&limit=${limit}`);
    const data = response.data;

    return {
      props: { data, },
      revalidate: 60 * 60
    }
  } catch (error) {
    console.error(error);

    return {
      props: { data: [] },
      revalidate: 60 * 60,
    }
  }
}

export default Home;