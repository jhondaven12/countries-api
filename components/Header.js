import Image from "next/image";

function Navbar({theme, handleTheme}) {
    return (
        <>
            <header className={theme ? "dark" : ''}>
                <nav>
                    <h1>Where in the world?</h1>

                    <button onClick={handleTheme}>
                        <i>
                            <Image
                                src={theme ? "/moonone.png" : "/moontwo.png"}
                                alt="moon"
                                width={15}
                                height={15}
                            />
                        </i>
                        Dark Mode
                    </button>

                </nav>
            </header>
        </>
    )
}

export default Navbar;