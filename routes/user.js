    const router = require("express").Router()

    const booking = require("../models/booking")
    const User = require("../models/user")
    const Listing = require("../models/listing")


    /* GET THE USER'S BOOKINGS */
    router.get("/:userId/bookings", async (req, res) => {
        try {
            const { userId } = req.params
            const bookings = await booking.find({ customerId: userId }).populate("customerId hostId listingId")
            res.status(202).json(bookings)
        } catch (err) {
            res.status(404).json({ message: "Can not find bookings!", error: err.message })
        }
    })

    /* ADD LISTINGS TO YOUR WISHLIST */
    router.patch("/:userId/:listingId", async (req, res) => {
        try {
            const { userId, listingId } = req.params
            const user = await User.findById(userId)
            const listing = await Listing.findById(listingId).populate("creator")

            const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId) 

            if (favoriteListing) {
                user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId) // when a user clicks on the heart icon if the listingsId already exists in favoriteListings array it is removed from the array using the user.wishList.filter 
                await user.save()
                res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList })

            } else {
                user.wishList.push(listing)// when a user clicks on the heart icon if the listingsId doesn't exists in favoriteListings array it is added to the array
                await user.save()
                res.status(200).json({ message: "Listing is added from wish list", wishList: user.wishList })
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({ message: "Could not add the following to WishList", error: err.message })

        }
    })


    /* GET PROPERTIES LIST */

    router.get("/:userId/properties-list", async (req, res) => {
        try {
            const { userId } = req.params
            const properties = await Listing.find({ creator: userId }).populate("creator")
            res.status(202).json(properties)
        } catch (err) {
            res.status(404).json({ message: "Can not find Properties List!", error: err.message })
        }
    })

    /* GET RESERVATIONS LIST */

    router.get("/:userId/reservations-list", async (req, res) => {
        try {
            const { userId } = req.params
            const reservations = await booking.find({ hostId: userId }).populate("customerId hostId listingId")
            res.status(202).json(reservations)
        } catch (err) {
            res.status(404).json({ message: "Can not find Reservations List!", error: err.message })
        }
    })

    module.exports = router