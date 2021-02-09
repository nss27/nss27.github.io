import QrScanner from './qr-scanner.min.js';

class App
{
    video = null;
    canvas = null;
    context = null;
    gallery = null;
    mirror = 1;
    qrScanner = null;

    constructor()
    {
        this.onInit();
    }

    async onInit()
    {
        QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

        this.canvas = document.querySelector('.image-sensor');
        this.context = this.canvas.getContext('2d');

        this.gallery = document.querySelector('#gallery');

        // Grab elements, create settings, etc.
        this.video = document.querySelector('.preview');

        this.mirror == 1? this.video.style.setProperty('transform', 'rotateY(0deg)') : this.video.style.setProperty('transform', 'rotateY(180deg)');

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) 
        {
            // Not adding `{ audio: true }` since we only want video now
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });

            //video.src = window.URL.createObjectURL(stream);
            this.video.srcObject = stream;
            this.video.play();
        }

        // Trigger photo take
        document.getElementById("sutter").addEventListener("click", this.takePicture.bind(this));

        document.getElementById("mirror").addEventListener("change", this.mirrorMode.bind(this));
    }

    takePicture()
    {
        const w = this.video.scrollWidth;
        const h = this.video.scrollHeight;

        this.canvas.setAttribute('width', w);
        this.canvas.setAttribute('height', h);

        this.context.scale(this.mirror, 1);
        this.context.drawImage(this.video, 0, 0, w * this.mirror, h);

        const image = this.canvas.toDataURL();

        this.gallery.setAttribute('src', image);

        QrScanner.scanImage(image)
            .then(result => {
                alert(result);
            })
            .catch(err => console.log(err));

        Tesseract.recognize(
            image,
            'eng+kor',
            // { logger: m => console.log(m) }
        )
            .then((result) => {
                alert(result.data.text);
            });
    }

    mirrorMode(e)
    {
        this.mirror = this.mirror == 1 ? -1 : 1;

        this.mirror == 1? this.video.style.setProperty('transform', 'rotateY(0deg)') : this.video.style.setProperty('transform', 'rotateY(180deg)');
    }
}

window.onload = () => {
    new App();
};