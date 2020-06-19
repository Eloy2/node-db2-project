const express = require("express")
const db = require("./data/config")

const server = express()

const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", async (req, res) => {
    try {
        const cars = await db("cars")
        res.json(cars)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong"})
    }
})

server.get("/:id", async (req, res) => {
    try {
        const car = await db("cars").where("id", req.params.id)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong"})
    }
})

server.post("/", async (req, res) => {
    if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
        res.status(400).json({ message: "Please include vin, make, model, and mileage (transmissionType and statusOfTitle are optional)"})
    }

    try{
        const payload = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmissionType: req.body.transmissionType || null,
            statusOfTitle: req.body.statusOfTitle || null
        }

        const [newCarId] = await db.insert(payload).into("cars")

        const getNewCar = await db.first("*").from("cars").where("id", newCarId)
        
        res.status(201).json(getNewCar)

    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong"})
    }
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})
