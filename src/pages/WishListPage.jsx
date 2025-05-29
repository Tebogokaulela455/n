import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard";
import "../partials/WishList.scss"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <div className="main-container">
        <NavBar />
        <div className="wishList-container">
          <h1 className="title-list">Your Wish List</h1>
          <hr />
          <div className="wishlist-content">
            <div className="wishlist-list">
              {wishList?.map(
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
  );
};

export default WishList;
