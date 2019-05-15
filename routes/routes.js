const gcpActions = require("../models/gcpActions");
const {worker} = require("../models/workers")

const uploads = {
    get: (req, res) => {
        res.render("uploads")
    },
    processUploads: (req, res, next) => {
        next()
    },
    post: (req, res) => {
        console.log(req.file.filename)
        let payload = {originalName: req.file.originalname, contentType: req.file.mimetype, filename: req.file.filename, size: req.file.size}

        worker.push({payload, req})

        res.render("uploads", {value: payload.originalName})
    }
}

const home = {
    get: (req, res) => {
        res.render('home')
    },
    post: (req, res) => {
        console.log(req.body)
        res.render("home", {imageList: []})
    }
}

const jobs = {
    get: (req, res) => {
        gcpActions.readMetadata("bl-imageJobs")
        res.render("jobs")
    }
}

module.exports = {
    home,
    uploads,
    jobs
}