import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { ArrowBackIosNew, ArrowForwardIos, Favorite } from "@mui/icons-material";
import { Button } from "@mui/material";
import { setWishList } from "../redux/state"
import "../partials/ListingCard.scss";




const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* IMAGE SLIDER + NEXT & PREV BUTTON  */
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
  }
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
  }

  /* ADD TO WISHLIST FUNCTION */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || []; // it will check if the user i null then the like button will no be displayed

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) { // so the creator can not favorite his own listings
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList))// to precisely return only the wishList and not the all the data from the response
    } else { return }
  }

  return (
    <div className="card-container" onClick={() => {
      navigate(`/listings/${listingId}`);
    }}>
      <div className="slider-container" >
        <div className="image-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths?.map((photo, index) => (
            <div className="slider" key={index}>
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div className="prev-button" onClick={(e) => {
                e.stopPropagation()
                goToPrevSlide(e)
              }}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => {
                e.stopPropagation()
                goToNextSlide(e)
              }}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>

            </div>
          ))}
        </div>
      </div>
      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>${price}</span> /per Night</p>
        </>
      ) : (
        <>
          <p>{startDate} - {endDate} </p>
          <p>Total:<span> ${totalPrice}</span></p>
        </>
      )}

      <Button className="favorite" onClick={(e) => { e.stopPropagation(); patchWishList(e); }} disabled={!user}>
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </Button>
    </div>
  )
}

export default ListingCard;