export default {

    title: "Freedom",
    artist: "Skrillex",
    logo: "images/logo.webp",
    time: "00:00",
    currentTime: "03:42",
    previous: "<",
    play: "▶",
    next: ">",

    show(){
        document.querySelector("body").insertAdjacentHTML("beforeend",         `
        <div class="container" id="main">
        <div class="row">
            <h1 class="text-center" id="name">${this.title}</h1>
            <h4 class="text-center" id="artist">${this.artist}</h4>
            <img src=${this.logo} alt="logo" id="logo"> 
            <div id="bar">  
                <div class="progress col-12 ps-0 pe-0">
                    <div class="progress-bar bg-warning ms-0" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>  
            <div class="container">
                <div class="row">
                    <div class="col-6 text-start time">${this.time}</div>
                    <div class="col-6 text-end time">${this.currentTime}</div>
                </div>
            </div> 
            <div id="buttonsGroup" class="text-center">
                <button class="buttons " id="previous">${this.previous}</button>
                <button class="buttons" id="play">${this.play}</button>
                <button class="buttons" id="next">${this.next}</button>
            </div>
        </div>
    </div>
    `);
    }
}