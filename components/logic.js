export default function logic() {
    let previous = document.querySelector("#previous"); //Pending to add a function
    let play = document.querySelector("#play");
    let next = document.querySelector("#next"); //Pending to add a function
    let progressBar = document.querySelector("#progressBar")
    let time = document.querySelector("#time") //time of the moment where the song is playing
    let songTime = document.querySelector("#songTime");
    let song = document.querySelector("#song");

    let isPlaying = false;
    let currentTime = 0;
    let songDuration = 165;
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
    
    play.addEventListener("click", function(){
        if(isPlaying){
            isPlaying = false;
            play.textContent = "▶";
            song.pause();
            clearInterval(interval); // Detener el intervalo de actualización
        }else{
            isPlaying = true;
            play.textContent = "⏸️";
            song.play();
    
            interval = setInterval(function(){
                if(currentTime >= songDuration){
                    clearInterval(interval);
                    isPlaying = false;
                    play.textContent = "▶";
                    currentTime = 0;
                    updateProgress();
                }else{
                    currentTime++;
                    updateProgress();
                }
            }, 1000);
        }
    });
}