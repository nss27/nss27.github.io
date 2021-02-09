import QrScanner from './qr-scanner.min.js';

class App
{
    video = null;
    canvas = null;
    context = null;
    gallery = null;
    mirror = 1;
    type = null;
    qrResult = null;
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

        this.qrResult = document.querySelector('.qr-result');

        // Grab elements, create settings, etc.
        this.video = document.querySelector('.preview');

        this.mirror == 1? this.video.style.setProperty('transform', 'rotateY(0deg)') : this.video.style.setProperty('transform', 'rotateY(180deg)');

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) 
        {
            // Not adding `{ audio: true }` since we only want video now
            // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });

            //video.src = window.URL.createObjectURL(stream);
            this.video.srcObject = stream;
            this.video.play();
        }

        // Trigger photo take
        document.getElementById("sutter").addEventListener("click", this.takePicture.bind(this));

        document.getElementById("mirror").addEventListener("change", this.mirrorMode.bind(this));

        this.qrScanner = new QrScanner(this.video, this.qrScan.bind(this));
        this.qrScanner.start();
    }

    takePicture()
    {
        const w = this.video.scrollWidth;
        const h = this.video.scrollHeight;

        this.canvas.setAttribute('width', w);
        this.canvas.setAttribute('height', h);

        this.context.scale(this.mirror, 1);
        this.context.drawImage(this.video, 0, 0, w * this.mirror, h);

        this.gallery.setAttribute('src', this.canvas.toDataURL());
    }

    mirrorMode(e)
    {
        this.mirror = this.mirror == 1 ? -1 : 1;

        this.mirror == 1? this.video.style.setProperty('transform', 'rotateY(0deg)') : this.video.style.setProperty('transform', 'rotateY(180deg)');
    }

    qrScan(result)
    {
        if(result.indexOf('http') > -1) result = `<a href="${result}">${result}</a>`;
        this.qrResult.innerHTML = result;
        this.qrResult.style.display = "block";

        setTimeout(() => {
            this.qrResult.style.display = "none";
        }, 2000);
    }
}

window.onload = () => {
    new App();
};