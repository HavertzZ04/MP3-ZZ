import logic from "./logic.js";
import data from "./data.js";

export default{
    show(){
        console.log(data);
        let list = data.map(song =>{

            let duration = formatTime(song.duration);
            let plantilla = `
            <tr class="selectSong">
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>${duration}</td>
            </tr>
        `
        return plantilla;
        });
        document.querySelector('#table tbody').innerHTML = list.join('');

        function formatTime(time){
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return `${(minutes < 10 ? '0': '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
        }
    }
}