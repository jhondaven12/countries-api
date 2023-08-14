import axios from 'axios';
import Router from 'next/router';
import Image from "next/image";
import Head from 'next/head';

export default function Country({ country, allCountries }) {

    if (!country) {
        return <p>Country not found.</p>
    }

    const languages = country.languages.map(language => language.name);

    const handleBorderButtonClick = (borderCode) => {
        const neighboringCountry = allCountries.find(
            (c) => c.alpha3Code === borderCode
          );
      
          if (neighboringCountry) {
            // You can navigate to the neighboring country's page here
            Router.push(`/country/${neighboringCountry.name}`);
          }
      };

    return (
        <>
            <Head>
                <title>Countries Api | {country.name}</title>
                <meta property="Countries Api " content="Countries Api" key={country.name} />
            </Head>
            <section className="result-container">
                <div>
                    <button onClick={() => Router.push('/')}>
                        <span className="arrow">
                            <Image
                                src="/left-arrow-black.png"
                                alt="Left Arrow"
                                width={15}
                                height={10}
                            />
                        </span>
                        Back
                    </button>
                </div>

                <div className="container">
                    <figure>
                        <div className="image-wrapper">
                            <Image
                                src={country.flags.png}
                                alt={country.name}
                                fill
                                priority={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                as="image"
                            />
                        </div>
                    </figure>

                    <div className="details">
                        <h2>{country.name}</h2>

                        <div>
                            <ul>
                                <li><b>Native Name:</b> {country.nativeName}</li>
                                <li><b>Population:</b> {country.population.toLocaleString()}</li>
                                <li><b>Region:</b> {country.region}</li>
                                <li><b>Sub Region:</b> {country.subregion}</li>
                                <li><b>Capital:</b> {country.capital}</li>
                            </ul>

                            <ul>
                                <li><b>Top Level Domain:</b> {country.topLevelDomain}</li>
                                <li><b>Currencies:</b> {country.currencies[0].name}</li>
                                <li><b>Languages</b> {languages.join(", ")} </li>
                            </ul>
                        </div>

                        <div>
                            <h3>Border Countries:</h3>
                            {country.borders ? (
                                country.borders.map((borderCode) => {
                                    const neighboringCountry = allCountries.find(
                                        (c) => c.alpha3Code === borderCode
                                    );

                                    return (
                                        <button
                                            key={borderCode}
                                            onClick={() => handleBorderButtonClick(borderCode)}
                                        >
                                            {neighboringCountry ? neighboringCountry.name : "null"}
                                        </button>
                                    );
                                })
                            ) : (
                                <p>No Result Found</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticPaths(){
    //Fetch the data to get all country names
    const response = await axios.get("https://jhondaven12.github.io/entertaimentApi/countries.json");
    const data = response.data;

    //Generate dynamic paths for each country name
    const paths = data.map((country) => ({
        params: { countryId: country.name }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const response = await axios.get("https://jhondaven12.github.io/entertaimentApi/countries.json");
    const data = response.data;

    // Find the specific country by matching the countryName parameter from the URL
    const country = data.find((country) => country.name === params.countryId);

    if(!country){
        return { notFound: true };
    }

    return {
        props: { country,  allCountries: data },
    }
}

