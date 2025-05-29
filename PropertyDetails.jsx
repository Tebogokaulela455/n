import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { facilities } from "../data"
import Loader from "../components/Loader"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

//react slider
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// for using the calendar component
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { useSelector } from "react-redux"

// personalized scss
import "../partials/PropertyDetails.scss"


const PropertyDetails = () => {
    const [loading, setLoading] = useState(true);

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const navigate = useNavigate();

    const getListingDetails = async () => {
        try {
            const response = await fetch(`https://rented-in.onrender.com/listings/${listingId}`, { method: "GET", })
            const data = await response.json()
            setListing(data)
            setLoading(false)
        } catch (err) {
            console.log("Failed to fetch listing details", err.message)
        }
    }
    useEffect(() => {
        getListingDetails()
    }, [])

    console.log("Current listing state:", listing); // for debugging

    /* THE BOOKING  CALENDAR */
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])
    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]) // the selected date range is updated when the user makes a selection
    };

    /* SUBMIT USER BOOKING */
    const customerId = useSelector((state) => state?.user?._id) // to select the id of the user that logs in
    const handleSubmit = async () => {
        try {
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * nightCount,
            }
            const response = await fetch("https://rented-in.onrender.com/bookings/create",
                {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingForm)
                })
            if (response.ok) {
                navigate(`/${customerId}/my-bookings`)
            }
        } catch (err) {
            console.log("Submiting Bokking Failed!", err.message)
        }
    }

    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)
    const nightCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) // Calculate the difference in days unit

    const settings = { // listing image slider
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="propertyDetails-container">
                <NavBar />

                <div className="listing-container">
                    <div className="listing-content">
                        
                    <div className="propertyTitle-container">
                        <div className="property-title">
                            <h3 className="title">{listing.city}, {listing.country}. {listing.title}</h3>
                            <div className="fav-button"></div>
                        </div>
                        <Slider {...settings} className="photos">
                            {listing.listingPhotoPaths?.slice(0, 4).map((photo) => (
                                <div className="images">
                                    <img src={`https://rented-in.onrender.com/${photo.replace("public", "")}`} alt="property-photos" />
                                </div>

                            ))}
                        </Slider>
                    </div>
                        <div className="informations-booking">

                            <div className="listing-informations">

                                <h2 className="listing-info">{listing.type} in {listing.city}, {listing.country}</h2>
                                <p className="listing-info-p">{listing.guestCount}: guests -  {listing.bedroomCount}: bedroom(s) -  {listing.bedCount}: bed(s) -  {listing.bathroomCount}: bathroom(s)</p>

                                <div className="about">
                                    <h3>About this place</h3>
                                    <p>{listing.description}</p>
                                    <hr />
                                </div>


                                <div className="highlits">
                                    <h2>The key Highlight of this place : {listing.highlight}</h2>
                                    <p>{listing.highlightDesc}</p>
                                </div>

                                <div className="creator-profile">
                                    <img src={`https://rented-in.onrender.com/${listing.creator.profilePicturePath.replace("public", "")}`} alt="" />
                                    <h3>Hosted by {listing.creator.firstName} {listing.creator.lastName}</h3>
                                </div>


                                <div className="amenities">
                                    <div className="amenities_title">
                                        <h2>What this place offers</h2>
                                    </div>
                                    <div className="amenities_content">
                                        {listing.amenities[0].split(",").map((item, index) => (
                                            <div className="facility" key={index}>
                                                <div className="facility_icon">
                                                    {facilities.find((facility) => facility.name === item)?.icon}
                                                </div>
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div className="booking">
                                <div className="booking_title">
                                    <h2>Select check-in date</h2>
                                </div>
                                <div className="date-range-calendar">
                                    <DateRange ranges={dateRange} onChange={handleSelect} />
                                    <h2>Check-In:  {dateRange[0].startDate.toDateString()}</h2>
                                    <h2>Check-Out: {dateRange[0].endDate.toDateString()}</h2>
                                    {nightCount > 1 ? (
                                        <h2>${listing.price} x {nightCount} nights</h2>
                                    ) : (
                                        <h2>${listing.price} x {nightCount} night</h2>
                                    )}
                                    <h2>Total:  ${listing.price * nightCount}</h2>

                                    <button className="book-button" type="submit" onClick={handleSubmit}>Book Now!</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        </>
    )
}

export default PropertyDetails