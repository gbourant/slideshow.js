class App {

    constructor() {
        let urlParams = new URLSearchParams(window.location.search)
        this.images = []
        this.username = urlParams.get('username')
        this.password = urlParams.get('password')
        this.imageDuration = 2//seconds
        this.refreshDuration = 2//minutes
        this.lastIndex = -1//remeber last image
    }

    start() {
        this.fetchImages().then(setInterval(() => this.display(), this.imageDuration * 1000))
        this.fetchImages().then(setInterval(() => this.fetchImages(), this.refreshDuration * 60 * 1000))
    }

    display() {
        let index = Math.floor(Math.random() * this.images.length)
        if (this.lastIndex != index) {
            this.lastIndex = index
        } else {
            this.display()
            return
        }
        fetch(`images/${this.images[index]}`, this.getRequestParams())
            .then(response => response.blob())
            .then(image => {
                let img = document.querySelector("#image")
                img.style.backgroundImage = `url(${URL.createObjectURL(image)})`
            })
    }

    async fetchImages() {
        const payload = await fetch('images/images.json', this.getRequestParams());
        const json = await payload.text();
        const images = JSON.parse(json);
        return this.images = images;
    }

    requestFullScreen() {
        let element = document.body
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen
        if (requestMethod) {
            requestMethod.call(element)
        }
    }

    getRequestParams() {
        let params = { method: 'GET' }
        if (this.username && this.password) params['headers'] = new Headers({ 'Authorization': 'Basic ' + btoa(this.username + ":" + this.password) });
        return params
    }
}