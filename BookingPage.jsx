import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTripList } from "../redux/state"
import "../partials/booking.scss"


const TripList = () => {
    const [loading, setLoading] = useState(true)
    const tripList = useSelector((state) => state.user.tripList)
    const userId = useSelector((state) => state.user._id)
    const dispatch = useDispatch()
    const getTripList = async () => {
        try {
            const response = await fetch(`https://rented-in.onrender.com/users/${userId}/bookings`, {
                method: "GET"
            })
            const data = await response.json();
            dispatch(setTripList(data));
            setLoading(false);

        } catch (err) {
            console.log("Fetching Trip List Failed", err.message)
        }
    }

    useEffect(() => {
        getTripList();
    }, []);

    return loading ? (
        <Loader />) : (
        <>
            <div className="main-container">
                <NavBar />
                <div className="booking-container">
                    <h2 className="">-Your Bookings-</h2>
                    <hr />
                    <div className="booking-content">
                        <div className="booking-list">
                            {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) =>
                                <ListingCard
                                    listingId={listingId._id}
                                    creator ={hostId._id}
                                    listingPhotoPaths={listingId.listingPhotoPaths}
                                    city={listingId.city}
                                    province={listingId.province}
                                    country={listingId.country}
                                    category={listingId.category}
                                    startDate={startDate}
                                    endDate={endDate}
                                    totalPrice={totalPrice}
                                    booking={booking}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default TripList