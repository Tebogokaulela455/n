import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { setListings } from "../redux/state"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard"
import "../partials/Search.scss"

const SearchPage = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const { search } = useParams()
    const listings = useSelector((state) => state.listings)

    const getSearchListings = async () => {
        try {
            const response = await fetch(
                `https://rented-in.onrender.com/listings/search/${search}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);

        } catch (err) {
            console.log("Fetch Search Listings Failed", err.message);
        }
    };

    useEffect(() => {
        getSearchListings();
    }, []);

    return loading ? (<Loader />) : (
        <>
            <div className="main-container">
                <NavBar />
                <div className="searchP-container">
                    <h1 className="title-list">-{search}</h1>
                    <hr />
                    <div className="searchP-content">
                        <div className="searchP-list">
                            {listings?.map(
                                ({
                                    _id,
                                    creator,
                                    listingPhotoPaths,
                                    city,
                                    province,
                                    country,
                                    category,
                                    type,
                                    price,
                                    booking = false,
                                }) => (
                                    <ListingCard
                                        listingId={_id}
                                        creator={creator}
                                        listingPhotoPaths={listingPhotoPaths}
                                        city={city}
                                        province={province}
                                        country={country}
                                        category={category}
                                        type={type}
                                        price={price}
                                        booking={booking}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>


        </>
    )
}

export default SearchPage