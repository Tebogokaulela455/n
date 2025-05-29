import { Link } from "react-router-dom";
import { categories } from "../data";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconContext } from "react-icons"; // for icons styling
import "../partials/Categories.scss"
import Footer from "../components/Footer"




const Categories = () => {

    const settings = { // categories slider
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

    return (

        <div className="categories_content">
            <h1>Discover Perfect Stays</h1>
            <span>At Rented-In, find the perfect stays for every journey.
                From cozy retreats to spacious homes.
                Explore and discover your ideal destination with ease!</span>
            <Slider {...settings} className="categories_list">
                {categories?.slice(1, 9).map((category, index) => (
                    <Link to={`/listings/category/${category.label}`} key={index} value={{ className: "link" }}>
                        <div className="category">
                            <img src={category.img} alt={category.label} />
                            <div className="overlay"></div>
                            <div className="category_icon">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <div>
                                        {category.icon}
                                    </div>
                                </IconContext.Provider>
                                <p>{category.label}</p>
                            </div>

                        </div>
                    </Link>
                ))}
            </Slider>
         
        </div>

    )
}

export default Categories