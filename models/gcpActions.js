// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const Firestore = require('@google-cloud/firestore'); 

const projectConfig = {
    projectId: 'projectvpc',
    keyFilename: '/home/shaheen/projectvpc-206eafb3d915.json'
}

const storage = new Storage(projectConfig)
const visionClient = new vision.ImageAnnotatorClient(projectConfig)
const firestore = new Firestore(projectConfig)

const saveFile = (
    bucket = 'betalabs-playground',
    filePath,
    options={}
) => {
    let bucketObj = storage.bucket(bucket);
        return new Promise((resolve, reject) => {
            bucketObj.upload(filePath, options)
            .then(() => {
                let destPath = `gs://${bucket}/${options.destination}`
                console.log(`Uploaded to ${destPath}`)
                resolve(destPath)
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
        })
};

const writeMetadata = (collection="", key, payload) => {
    console.log(collection+key)
    const document = firestore.doc(collection+key)
    return new Promise((resolve, reject) => {
        document.set(payload)
            .then((response) => {
                console.log(response)
                resolve(payload.filename)
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
    })

};

const readMetadata = (collection="", key) => {
    let docRef = firestore.doc(collection+key)
    return new Promise((resolve, reject) => {
        console.log("Flag3")
        docRef.get("success")
            .then((docSnapshot) => {
                if (docSnapshot.exists) resolve(docSnapshot)
                reject("Not Found")
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
    })
};

const queryMetadata = (collection="", key) => {
    let docRef = firestore.doc(collection+key)
    return new Promise((resolve, reject) => {
        console.log("Flag3")
        docRef.get("success")
            .then((docSnapshot) => {
                if (docSnapshot.exists) resolve(docSnapshot)
                reject("Not Found")
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
    })
};

const detectText = (filePath, options={}) => {
    return new Promise((resolve, reject) => {
        visionClient.textDetection(filePath)
            .then((response) => {resolve(response)})
            .catch((e) => {reject (e)})
    })
}

module.exports = {
    saveFile,
    writeMetadata,
    readMetadata,
    detectText
}