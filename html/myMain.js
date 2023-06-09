import data from "../components/data.js";
export default {

    title: data[0].title,
    artist: data[0].artist,
    logo: data[0].logo,
    start: "00:00",
    like: "🧡",
    previous: "⏮️",
    play: "▶",
    next: "⏭️",
    shuffle: "🔀",
    song: data[0].song,

    show(){
        document.querySelector("#main").insertAdjacentHTML("beforeend",
        `
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center" id="title">${this.title}</h1>
                    <h4 class="text-center" id="artist">${this.artist}</h4>
                    <img src=${this.logo} alt="logo" id="logo"> 
                    <div id="bar">  
                        <div class="progress col-12 ps-0 pe-0 colorBar">
                            <input class="progress-bar" max="0" type="range" value="0"  id="progressBar">
                        </div>
                    </div>  
                    <div class="container">
                        <div class="row">
                            <div class="col-6 text-start time" id="time">${this.start}</div>
                            <div class="col-6 text-end time" id="songTime"></div>
                        </div>
                    <div> 
                    <div id="buttonsGroup" class="text-center">
                        <button class="buttons" id="repeat">${this.like}</button>
                        <button class="buttons" id="previous">${this.previous}</button>
                        <button class="buttons" id="play">${this.play}</button>
                        <button class="buttons" id="next">${this.next}</button>
                        <button class="buttons" id="shuffle">${this.shuffle}</button>
                        <audio id="song" src="${this.song}" controls=""></audio>
                    </div>
                </div>
            </div>
        `
        );
    }
};