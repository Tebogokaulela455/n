import { IconButton } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setLogout } from "../redux/state";
import "../partials/navbar.scss"


const NavBar = () => {
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ search, setSearch ] = useState("")

    return (

        <div className="navbar">
            <a href="/">
                <img src="/assets/logo.png" alt='logo' />
            </a>
            <div className="navbar_search">
                <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <IconButton >
                    <Search className="navbar_search_svg" onClick={() => {navigate(`/listings/search/${search}`)}} />
                </IconButton>
            </div>

            <div className="navbar_right">
                {user ? (<a href="/create-listing" className="host">Become A Host</a>
                ) : (
                    <a href="/login" className="host" >Become A Host</a>)}
                <button className="navbar_right_account" onClick={() => setDropDownMenu(!dropDownMenu)}>
                    <Menu />
                    {!user ?
                        (<Person />
                        ) : ( // to replace the Person icon with the users own profile picture
                            <img
                                src={`https://rented-in.onrender.com/${user.profilePicturePath.replace("public", "")}`}
                                alt=""
                                style={{ objectFit: "cover", borderRadius: "50%" }}
                            />
                        )
                    }
                </button>
                {dropDownMenu && !user && (
                    <div className="navbar_right_dropdownmenu">
                        <Link to="/login">Log In</Link>
                        <Link to="/register">Sign Up</Link>
                    </div>
                )}
                {dropDownMenu && user && (
                    <div className="navbar_right_dropdownmenu">
                        <Link to={`/${user._id}/my-bookings`}>My Bookings</Link>
                        <Link to={`/${user._id}/my-wish-list`}>My Wish List</Link>
                        <Link to={`/${user._id}/property-list`}>My Listings</Link>
                        <Link to={`/${user._id}/reservations-list`}>Clients Reservations</Link>
                        <Link to="/create-listing">Host a Property</Link>
                        <Link to="/" onClick={() => {
                            dispatch(setLogout())
                        }}>Log Out</Link>
                    </div>
                )}
            </div>
        </div>


    )
}

export default NavBar