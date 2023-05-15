import data from "./data.js";
let logic = function(){

    let previous = document.querySelector("#previous"); 
    let play = document.querySelector("#play");
    let next = document.querySelector("#next"); 
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

    function updateProgress(){
        let progress = (currentTime / songDuration) * 100;
        progressBar.style.width = progress + "%";
        time.textContent = formatTime(currentTime);
    }
    
    function formatTime(time){
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return `${(minutes < 10 ? '0': '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
    }
    songTime.innerHTML = formatTime(songDuration);
    
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

    function playSong() {
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
            play.innerHTML = "⏸️";
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
        if(isPlaying){
            song.pause();
            clearInterval(interval);
            isPlaying = false;
            play.innerHTML = "▶";
        } else {
            playSong();
        }
    });

    song.addEventListener("timeupdate", function () {
        currentTime = Math.floor(song.currentTime);
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
}

export default logic;