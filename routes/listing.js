const router = require("express").Router()
const multer = require("multer")


const Listing = require("../models/listing")
const User = require("../models/user")
/* Configuring Multer for file Uploads */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // to store the uploaded files in the upload folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // to use the original file name
    },
});


const upload = multer({ storage })

/* Creating Listings POST method */

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        /*collect the data from the form */
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body

        const listingPhotos = req.files
        if (!listingPhotos) {
            res.status(400).send("No file uploaded!")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing(
            {
                creator,
                category,
                type,
                streetAddress,
                aptSuite,
                city,
                province,
                country,
                guestCount,
                bedroomCount,
                bedCount,
                bathroomCount,
                amenities,
                listingPhotoPaths,
                title,
                description,
                highlight,
                highlightDesc,
                price,
            })

        await newListing.save()

        res.status(200).json(newListing)
    } catch (err) {
        res.status(400).json({ message: "Failed to create listing!", error: err.message })
        console.log(err)
    }
});

/* fetch listing BY CATEGORY */

router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")
        }
        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listings", error: err.message })
        console.log(err)
    }


})


/* fetch listing BY SEARCHING INPUT */

router.get("/search/:search", async (req, res) => {
    const { search } = req.params

    try {
        let listings = []

        if (search === "all") {
            listings = await Listing.find().populate("creator")
        } else {
            listings = await Listing.find({
                $or: [
                    // $regex Regular expressions is a mongoDb operator that let's you use search patterns to match character combinations in strings
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ]
            }).populate("creator")
        }

        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err)
    }
})


/* Fetch Details of Listed Properties */

router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        // Use populate to fetch the full details of the creator
        const listing = await Listing.findById(listingId).populate("creator");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found!" });
        }
        res.status(202).json(listing);
    } catch (err) {
        res.status(404).json({ message: "Listing not found!", error: err.message })
    }
})

module.exports = router