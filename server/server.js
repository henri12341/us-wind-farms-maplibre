const express = require("express")
const sqlite = require("better-sqlite3")
const path = require('path');
const db = new sqlite(path.resolve("us_wind_farms.db"), {fileMustExist: true});

const app = express()
app.use(express.json());

app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET') //, POST, PATCH, DELETE')
    next();
})

app.get("", async (req,res,next) => {
    res.json("us wind farms")
})

app.get("/wind_farm_locations", async (req,res,next) => {
    let data = await db.prepare("SELECT xlong, ylat FROM wind_turbines").all()
    res.json(data)
})

const port = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Api is running on port ${port}`)
    })
}