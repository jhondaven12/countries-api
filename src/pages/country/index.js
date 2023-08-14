import Link from "next/link";
import Image from "next/image";

function CountryList({ countries }) {
    return (
        <>
            {countries.length === 0 ? (
                <div className="loading">
                    <h1>Result Not Found</h1>
                </div>
            ) : (
                <section>
                    <ul className="country-list">
                        {countries.map((item, index) => (
                            <li key={index}>
                                <Link href={`/country/${item.name}`}>

                                    <figure>
                                        <div className="image-wrapper">
                                            <Image
                                                src={item.flags.png}
                                                alt={item.name}
                                                fill
                                                priority={true}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                as="image"
                                            />
                                        </div>
                                    </figure>

                                    <ul className="desc">
                                        <h3>{item.name}</h3>
                                        <li><b>Population:</b> {item.population.toLocaleString()}</li>
                                        <li><b>Region:</b> {item.region}</li>
                                        <li><b>Capital:</b> {item.capital}</li>
                                    </ul>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

export default CountryList;