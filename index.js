const express = require("express");
require('./db')
const LoadService = require("./service/loadService");
const RateService = require("./service/rateService");
const caclulateApplicableRate = require("./service/caclulateApplicableRate");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/loads", async (req, res) => {
    const load = await LoadService.createLoad(req.body);
    res.json(load);
});

app.get("/getAllLoads", async (req, res) => {
    console.log('in get all loads')
    const loads = await LoadService.getAllLoad();
    res.json(loads);
})

app.post("/rate", async (req, res) => {
    const rate = await RateService.createRate(req.body);
    res.json(rate);
});

app.get("/find-applicable-rate/load/:loadId", async (req, res) => {
    console.log('in applicable rate route', req.params.loadId)
    const amount = await caclulateApplicableRate(req.params.loadId)
    res.json(amount);

})


app.listen(3000, () => {
    console.log("Server started");
});
