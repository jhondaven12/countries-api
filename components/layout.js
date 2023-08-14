import Navbar from './Header';
import Head from 'next/head';
import {useState, useEffect} from 'react';

export default function Layout({children}){

    const [theme, setTheme] = useState(false);

    useEffect(() => {
        const savedTheme = sessionStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        // Update the class on the body element
        document.body.classList.toggle("dark", theme);
    }, [theme]);

    const handleTheme = () => {
        const newTheme = !theme;
        sessionStorage.setItem("theme", newTheme ? "dark" : "light");
        setTheme(newTheme);
    };

    return (
        <>
        <Head>
            <title>Countries Api</title>
        </Head>
        <Navbar theme={theme} handleTheme={handleTheme}/>
        <main className={theme ? "dark" : ''}>{children}</main>
        </>
    )
}