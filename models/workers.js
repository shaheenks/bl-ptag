const queue = require("async/queue");

const worker = queue((task, callback) => {
    console.log("starting" + task.payload)

    let payload = task.payload;
    let req = task.req

    gcpActions.writeMetadata("bl-imageJobs/", payload.filename, {store: false, decode: false, metadata: false, index: false})
            .then((r) => {
                console.log(r)
                return gcpActions.saveFile("betalabs-playground", req.file.path, {destination: req.file.path, metadata: {contentType: req.file.mimetype}})
            })        
            .then((csPath) => {
                payload.path = csPath;
                return gcpActions.detectText(payload.path)
            })
            .then((annotation) => {
                let keywords = annotation[0].textAnnotations.map((word) => {
                    return word.description.replace(/\n/g, " ").trim()
                })
                payload.keywords = keywords
                return gcpActions.writeMetadata("bl-imageMetadata/", payload.filename, payload)
            })
            .then((r) => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })

    callback()
}, 1)

worker.drain = () => {
    console.log('Worker queue is empty')
}

module.exports.worker = worker