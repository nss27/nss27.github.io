class App
{
    video = null;
    canvas = null;
    context = null;
    gallery = null;
    mirror = 1;

    constructor()
    {
        this.onInit();
    }

    async onInit()
    {
        this.canvas = document.querySelector('.image-sensor');
        this.context = this.canvas.getContext('2d');

        this.gallery = document.querySelector('#gallery');

        // Grab elements, create settings, etc.
        this.video = document.querySelector('.preview');

        if(this.mirror == -1) this.video.style.setProperty('transform', 'rotateY(180deg)');

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) 
        {
            // Not adding `{ audio: true }` since we only want video now
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            //video.src = window.URL.createObjectURL(stream);
            this.video.srcObject = stream;
            this.video.play();
        }

        // Trigger photo take
        document.getElementById("sutter").addEventListener("click", this.takePicture.bind(this));
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
}

window.onload = () => {
    new App();
};