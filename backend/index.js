const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.config({
    cloud_name: 'dj7hhxsqq',
    api_key: '932552733385796',
    api_secret: '124k3Wwm-fNpzdIrueJ2gbKoP1A'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    cloudinary.uploader.upload_stream({ resource_type: "auto" },
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Upload failed' });
            } else {
                res.status(200).json({ url: result.url });
            }
        }
    ).end(req.file.buffer);
});



app.listen(9000,()=>{
    console.log("server is running at port 9000");
})
