// script.js
const cloudinaryUploadUrl = 'https://machine-learing-mock-24jg.vercel.app/';

const dropArea = document.getElementById('dropArea');
const fileElem = document.getElementById('fileElem');
const progressBar = document.getElementById('progressBar');
const status = document.getElementById('status');

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

fileElem.addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    [...files].forEach(uploadFile);
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', cloudinaryUploadUrl, true);

    xhr.upload.addEventListener('progress', function(event) {
        const percent = (event.loaded / event.total) * 100;
        progressBar.style.width = percent + '%';
    });

    xhr.onload = function() {
        if (xhr.status === 200) {
            status.textContent = 'Upload successful';
            const response = JSON.parse(xhr.responseText);
            renderImage(response.url);
        } else {
            status.textContent = 'Upload failed';
        }
    };

    xhr.send(formData);
}

function renderImage(url) {
    const img = new Image();
    img.src = url;
    document.body.appendChild(img);
}
