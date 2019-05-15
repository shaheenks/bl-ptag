const gcpActions = require('./models/gcpActions');

/* gcpActions.saveFile(
    bucket="betalabs-playground",
    filePath="/home/shaheen/Downloads/5cb037dd8f3f36e647381ca30b443088",
    options={
        destination: "test/sample.jpg",
        metadata: {
            contentType: 'image/jpeg'
        }
    }
).then(r => console.log).catch(e => console.log) */

/* gcpActions.detectText("gs://betalabs-playground/test/sample.jpg")
    .then(r => {
        console.log("resolve")
        console.log(r)
    }).catch(e => {
        console.log("reject")
        console.log(r)
    }) */

// gcpActions.writeMetadata("bl-imageMetadata/", "abcd", {success: true}).then(r => console.log).catch(e => console.log) 

// gcpActions.readMetadata("bl-imageMetadata/", "abcd").then(r => console.log(r.data())).catch(e => console.log(e)) 