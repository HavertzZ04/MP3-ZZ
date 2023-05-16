export default {
    song: "Song",
    artist: "Artist",
    time: "Time",

    show(){
        document.querySelector("#tableContainer").insertAdjacentHTML("beforeend",
        `
            <div class="row">
                <input type="text" placeholder="Search..." class="text-center col-10 mx-auto" id="searchBar">
                <div id="tableBox" class="col-11 text-center">
                    <table class="table" id="table">
                        <thead>
                            <tr>
                            <th scope="col">${this.song}</th>
                            <th scope="col">${this.artist}</th>
                            <th scope="col">${this.time}</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `
        )
    }
}