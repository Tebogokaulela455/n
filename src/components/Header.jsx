import "../partials/Header.scss"
import "../components/NavBar"
import { useSelector } from "react-redux"
import NavBar from "./NavBar"

const Header = () => {
    const user = useSelector((state) => state.user)
    return (

        <div className="header_container">
            <NavBar />
            <div className="header_content">
                {user ? (<><h2 href="/create-listing" className="header_content_host">Welcome back {user.firstName}!</h2>
                    <span className="header_content_website_desc"> Search for your perfect house in just one click! Whether it's for vacations or business trips,
                        Rented-In has what you need.
                        Don't forget, you can also host your own place and welcome guests from our vibrant community.</span>
                        <h2 className="header_content_become_host"><a href="/create-listing">Become A Host</a></h2>
                        </>
                ) : (<>
                    <h2 className="header_content_welcome_message">Welcome To Rented-In!</h2>
                    <span className="header_content_website_desc">Your premier destination for renting exceptional homes for vacations or business stays.
                        Whether you're listing your own property or searching for the perfect rental, Rented-In connects you with reliable hosts and guests,
                        ensuring a hassle-free and rewarding experience.</span>
                    <h1 className="header_content_join_message">Join our community and start your journey with us today! <a href="/register">Sign Up Now</a></h1>
                </>
                )}
            </div>
        </div>


    )
}

export default Header