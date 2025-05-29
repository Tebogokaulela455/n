import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { setListings } from "../redux/state"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard"
import "../partials/Category.scss"

const CategoryPage = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const { category } = useParams()
    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(
                `https://rented-in.onrender.com/listings?category=${category}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);

        } catch (err) {
            console.log("Fetch Listings Failed", err.message);
        }
    };

    useEffect(() => {
        getFeedListings();
    }, [category]);

    return loading ? (<Loader />) : (
        <>
            <div className="main-container">
                <NavBar />
                <div className="categoryP-container">
                    <h1 className="title-list">-{category} listings:</h1>
                    <hr />
                    <div className="categoryP-content">
                        <div className="categoryP-list">
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

export default CategoryPage