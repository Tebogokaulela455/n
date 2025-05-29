import "../partials/CreateListing.scss"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { categories, types, facilities } from "../data"
import { useState } from "react";/*for creating a state variable and a function to update it */
import { useSelector } from "react-redux"; /* for selecting and retrieving state from the Redux store  */
import { useNavigate } from "react-router-dom"; /* react hook for navigating between routes */
import { IoIosImages } from "react-icons/io"; /* for the photo gallery icon  will be used inside the photo div */
import { BiTrash } from "react-icons/bi"; /* for the trash can icon */
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material"; /* add and remove icons */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; /* This package enables smooth and customizable drag-and-drop functionality for adding pictures */

const CreateListing = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");

    /* LOCATION */
    const [formLocation, setFormLocation] = useState({
        streetAddress: "",
        aptSuite: "",
        city: "",
        province: "",
        country: "",
    });

    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setFormLocation({
            ...formLocation,
            [name]: value,
        });
    };

    /* BASIC COUNTS */
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    /* AMENITIES */
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((option) => option !== facility)
            );
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
    };
    console.log(amenities); /*for debugging purposes */

    /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
    const [photos, setPhotos] = useState([]);

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

    const handleDragPhoto = (result) => {
        if (!result.destination) return;

        const items = Array.from(photos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPhotos(items);
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
            prevPhotos.filter((_, index) => index !== indexToRemove)
        );
    };

    /* DESCRIPTION */
    const [formDescription, setFormDescription] = useState({
        title: "",
        description: "",
        highlight: "",
        highlightDesc: "",
        price: "",
    });

    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription({
            ...formDescription,
            [name]: value,
        });
    };

    console.log(formDescription); /*for debugging purposes */

    const creatorId = useSelector((state) => state.user._id);

    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            /* Create a new FormData object to handle file uploads */
            const listingForm = new FormData();
            listingForm.append("creator", creatorId);
            listingForm.append("category", category);
            listingForm.append("type", type);
            listingForm.append("streetAddress", formLocation.streetAddress);
            listingForm.append("aptSuite", formLocation.aptSuite);
            listingForm.append("city", formLocation.city);
            listingForm.append("province", formLocation.province);
            listingForm.append("country", formLocation.country);
            listingForm.append("guestCount", guestCount);
            listingForm.append("bedroomCount", bedroomCount);
            listingForm.append("bedCount", bedCount);
            listingForm.append("bathroomCount", bathroomCount);
            listingForm.append("amenities", amenities);
            listingForm.append("title", formDescription.title);
            listingForm.append("description", formDescription.description);
            listingForm.append("highlight", formDescription.highlight);
            listingForm.append("highlightDesc", formDescription.highlightDesc);
            listingForm.append("price", formDescription.price);

            /* Append each selected photos to the FormData object */
            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo);
            });

            /* Send a POST request to server */
            const response = await fetch("https://rented-in.onrender.com/listings/create", {
                method: "POST",
                body: listingForm,
            });

            if (response.ok) {
                navigate("/");
            }
        } catch (err) {
            console.log("Publish Listing failed", err.message);
        }
    };
    return (
        <>
        <div className="mainPage-Container">
            <NavBar />

            <div className="createListing_container">

                <h1>Advertise Your Rental</h1>

                <form className="createListing-content" onSubmit={handlePost}>

                    <div className="createListing-content_step1">
                        <h2>- Step 1: Describe Your Property</h2>

                        <h3>Select the category that best fits your property</h3>
                        <div className="category-list">
                            {categories?.map((item, index) => (
                                <div className={`category ${category === item.label ? "selected" : ""}`} key={index} onClick={() => setCategory(item.label)}>
                                    <div className="category_icon" required>{item.icon}</div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <hr className="divideF" />
                        <h3>What kind of accommodations can your guests expect here?</h3>
                        <div className="type-list">
                            {types?.map((item, index) => (
                                <div className={`type ${type === item.name ? "selected" : ""}`} key={index} onClick={() => setType(item.name)} required >
                                    <div className="type_text">
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="type_icon">{item.icon}</div>
                                </div>
                            ))}
                        </div>
                        <hr className="divideF" />
                        <h3>Provide an overview of your property</h3>
                        <div className="overview">
                            <div className="basic">
                                <p>Guests</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline
                                        onClick={() => {
                                            guestCount > 1 && setGuestCount(guestCount - 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                    <p>{guestCount}</p>
                                    <AddCircleOutline
                                        onClick={() => {
                                            setGuestCount(guestCount + 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="basic">
                                <p>Bedrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline
                                        onClick={() => {
                                            bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                    <p>{bedroomCount}</p>
                                    <AddCircleOutline
                                        onClick={() => {
                                            setBedroomCount(bedroomCount + 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="basic">
                                <p>Beds</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline
                                        onClick={() => {
                                            bedCount > 1 && setBedCount(bedCount - 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                    <p>{bedCount}</p>
                                    <AddCircleOutline
                                        onClick={() => {
                                            setBedCount(bedCount + 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="basic">
                                <p>Bathrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline
                                        onClick={() => {
                                            bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                    <p>{bathroomCount}</p>
                                    <AddCircleOutline
                                        onClick={() => {
                                            setBathroomCount(bathroomCount + 1);
                                        }}
                                        sx={{
                                            fontSize: "25px",
                                            cursor: "pointer",
                                            "&:hover": { color: '#F8395A' },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <h3>Where's your place located?</h3>
                        <div className="full">
                            <div className="location">
                                <p>Street Address</p>
                                <input type="text" placeholder="Street Address" name="streetAddress" value={formLocation.streetAddress} onChange={handleChangeLocation} required />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Apartment, Suite, etc. (if applicable)</p>
                                <input type="text" placeholder="Apt, Suite, etc. (if applicable)" name="aptSuite" value={formLocation.aptSuite} onChange={handleChangeLocation} />
                            </div>
                            <div className="location">
                                <p>City</p>
                                <input type="text" placeholder="City" name="city" value={formLocation.city} onChange={handleChangeLocation} required />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Province</p>
                                <input type="text" placeholder="Province" name="province" value={formLocation.province} onChange={handleChangeLocation} required />
                            </div>
                            <div className="location">
                                <p>Country</p>
                                <input type="text" placeholder="Country" name="country" value={formLocation.country} onChange={handleChangeLocation} required />
                            </div>
                        </div>
                        <hr className="divideF" />

                    </div>

                    <div className="createListing-content_step2">
                        <h2>- Step 2: Set your property apart from the rest</h2>

                        <h3>Share what your accommodation provides for guests</h3>
                        <div className="amenities">
                            {facilities?.map((item, index) => (
                                <div className={`facility ${amenities.includes(item.name) ? "selected" : ""}`}
                                    key={index} onClick={() => handleSelectAmenities(item.name)}>
                                    <div className="facility_icon">{item.icon}</div>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="divideF" />
                        <div className="upload_picture">
                            <h3>Upload images of your place</h3>
                            <DragDropContext onDragEnd={handleDragPhoto}>
                                <Droppable droppableId="photos" direction="horizontal">
                                    {(provided) => (
                                        <div className="photos" {...provided.droppableProps} ref={provided.innerRef}>
                                            {photos.length < 1 && (
                                                <>
                                                    <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadPhotos} multiple />
                                                    <label htmlFor="image" className="alone">
                                                        <div className="icon">
                                                            <IoIosImages />
                                                        </div>
                                                        <p>Upload from your device</p>
                                                    </label>
                                                </>
                                            )}

                                            {photos.length >= 1 && (
                                                <>
                                                    {photos.map((photo, index) => {
                                                        return (
                                                            <Draggable key={index} draggableId={index.toString()} index={index} >
                                                                {(provided) => (
                                                                    <div className="photo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                        <img src={URL.createObjectURL(photo)} alt="place" />
                                                                        <button type="button" onClick={() => handleRemovePhoto(index)} >
                                                                            <BiTrash />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadPhotos} multiple
                                                    />
                                                    <label htmlFor="image" className="together">
                                                        <div className="icon">
                                                            <IoIosImages />
                                                        </div>
                                                        <p>Upload from your device</p>
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        <hr className="divideF" />
                        <div className="property_desc">
                            <h3>What makes your property attractive and vibrant?</h3>
                            <div className="description">
                                <p>Title</p>
                                <input type="text" placeholder="Title" name="title" value={formDescription.title} onChange={handleChangeDescription} required />
                                <p>Description</p>
                                <textarea type="text" placeholder="Description" name="description" value={formDescription.description} onChange={handleChangeDescription} required />
                                <p>Highlight</p>
                                <input type="text" placeholder="Highlight" name="highlight" value={formDescription.highlight} onChange={handleChangeDescription} required />
                                <p>Highlight Description</p>
                                <textarea type="text" placeholder="Highlight Description" name="highlightDesc" value={formDescription.highlightDesc} onChange={handleChangeDescription} required />
                                <p>Set your Price Below</p>
                                <span>$</span>
                                <input type="number" placeholder="100" name="price" value={formDescription.price} onChange={handleChangeDescription} className="price" required />
                            </div>
                        </div>


                    </div>

                    <div className="createListing-content_sub_button">
                        <button className="submit_btn" type="submit">
                            CREATE YOUR LISTING
                        </button>
                    </div>
                </form>

            </div>
            <Footer />
            </div>
        </>
    )
}

export default CreateListing