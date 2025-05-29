import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard"
import { setPropertyList } from "../redux/state"
import "../partials/PropertyList.scss"

const PropertyListPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const getPropertiesListings = async () => {
    try {
      const response = await fetch(`https://rented-in.onrender.com/users/${user._id}/properties-list`, {
        method: "GET"
      })
      const data = await response.json()
      dispatch(setPropertyList(data));
      setLoading(false);

    } catch (err) {
      console.log("Fetching your properties failed", err.message)
    }
  }
  useEffect(() => {
    getPropertiesListings()
  }, [])


  return loading ? (
    <Loader />) : (
    <>
      <div className="main-container">
        <NavBar />
        <div className="property-container">
          <h2 className="">-Your Property Listings-</h2>
          <hr />
          <div className="property-content">
            <div className="property-list">
              {propertyList.map(
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
                  booking = false
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

export default PropertyListPage