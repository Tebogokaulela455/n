import Header from "../components/Header"// we didn't use {Header} bcs `Header`is a default export
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
const Home = () => {
    return (
        <>
            <Header />
            <Categories />
            <Listings />
            <Footer />
        </>
    )
}

export default Home

