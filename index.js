const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()


const authentificationRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors())
app.use(express.json())
app.use(express.static("public"))


/* ROUTES */
 app.use("/auth", authentificationRoutes)
app.use("/listings", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const port =  process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
    dbName: "Rented-In",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(port, () => console.log(`Server is running succesfully on ${port}`));
    })
    .catch((err) => console.log(`${err} did not connect`));