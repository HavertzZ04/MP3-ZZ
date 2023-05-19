import data from "./data.js";
import table from "./table.js";
let logic = function(){

    let previous = document.querySelector("#previous"); 
    let play = document.querySelector("#play");
    let next = document.querySelector("#next");
    let shuffle = document.querySelector("#shuffle");
    let progressBar = document.querySelector("#progressBar")
    let time = document.querySelector("#time") //time of the moment where the song is playing
    let songTime = document.querySelector("#songTime");
    let song = document.querySelector("#song");
    let title = document.querySelector("#title");
    let artist = document.querySelector("#artist");
    let logo = document.querySelector("#logo");

    let isPlaying = false;
    let currentTime = 0;
    let songDuration = data[0].duration;
    let currentIndex = 0;
    let interval;

    progressBar.addEventListener('change', (e)=>{
        song.currentTime = progressBar.value;

    })


    function updateProgress() {
        progressBar.setAttribute("max", `${songDuration}`);
        progressBar.value = song.currentTime;
        time.textContent = formatTime(song.currentTime);
    }
    
    function formatTime(time){
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${(minutes < 10 ? '0': '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
    }
    songTime.innerHTML = formatTime(songDuration);

    function validate (){
        if(isPlaying){
            song.pause();
            clearInterval(interval);
            isPlaying = false;
            play.innerHTML = "▶";
        } else {
            playSong();
        }
    }

    function resetInput(){
        progressBar.value = 0;
    }
    
    function playNext(){
        clearInterval(interval);
        currentIndex++;
        if(currentIndex >= data.length){
            currentIndex = 0;
        }
        playSong();
    }

    function playPrevious(){
        clearInterval(interval);
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = data.length - 1;
        }
        playSong();
    }

    function playShuffle(array){
        for(let random, temp, position = array.length;
            position;
            random = Math.floor(Math.random() * position),
            temp = array[--position],
            array[position] = array[random],
            array[random] = temp);
        return array;
    }    
    
    function playSong() {
        resetInput();
        let currentSong = data[currentIndex];
        song.src = currentSong.song;
        songDuration = parseInt(currentSong.duration);
        songTime.innerHTML = formatTime(songDuration);
        title.textContent = currentSong.title;
        artist.textContent = currentSong.artist;
        logo.src = currentSong.logo;
        isPlaying = true;
        play.innerHTML = "⏸️";
      
        // Reanudar desde la posición anterior
        song.currentTime = currentTime;
        song.play();
      
        interval = setInterval(function () {
          if (currentTime >= songDuration) {
            clearInterval(interval);
            isPlaying = false;
            currentTime = 0;
            updateProgress();
            playNext();
          } else {
            currentTime++;
            updateProgress();
          }
        }, 1000);
    }

    play.addEventListener("click", function(){
        validate(); 
    });

    song.addEventListener("timeupdate", function () {
        updateProgress();
    });
      
    song.addEventListener("ended", function () {
        clearInterval(interval);
        isPlaying = false;
        play.innerHTML = "▶";
        currentTime = 0;
        updateProgress();
        playNext();
    });

    next.addEventListener("click", function(){
        currentTime = 0;
        updateProgress();
        playNext();
    });

    previous.addEventListener("click", function(){
        currentTime = 0;
        updateProgress();
        playPrevious();
    });

    shuffle.addEventListener("click", function(){
        playShuffle(data);
        table.show(playShuffle(data));
        currentTime = 0;
        currentIndex = 0;
        updateProgress();
        validate();
        playSong();
    });
}

export default logic;