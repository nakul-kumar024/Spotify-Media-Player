console.log("hello this is spotify clone")
let currentSong = new Audio();
let songs;


function secondsToMinutes(second) {
    if (isNaN(second) || second < 0) {
        return "~"

    }

    const minutes = Math.floor(second / 60);
    const remainingSeconds = Math.floor(second % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`
}



async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/music/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []


    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/music/")[1])
        }

    }
    return songs;

}

const playMusic = (track, pause = false) => {
    currentSong.src = "/music/" + track
    if (!pause) {
        // currentSong.play()
        currentSong.play();
        play.src = "pause.svg"
    }

    document.querySelector(".musicInfo").innerHTML = decodeURI(track)
    document.querySelector(".musicTime").innerHTML = "00:00/00:00"


}

async function main() {
    songs = await getsongs()
    playMusic(songs[0], true)
    console.log(songs)


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="filter" src="musicCd.svg" alt="">
        <div class ="info">
        <div> ${song.replaceAll("%20", " ")}</div>
        <div>KK</div>
        </div>
        <div> play now</div>
        <img class="filter" src="play.svg" alt="">

    </li>`


    }



    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })



    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"

        } else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })



    currentSong.addEventListener("timeupdate", () => {

        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".musicTime").innerHTML =
            `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    })






    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })




    document.querySelector(".hamburger").addEventListener("click", e => {
        document.querySelector(".left_mid").style.left = "0"

    })
    document.querySelector(".close").addEventListener("click", e => {
        document.querySelector(".left_mid").style.left = "-120%"

    })






    // var audio = new Audio(songs[0]);
    // audio.play();


    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // });
}


previous.addEventListener("click",()=>{
    currentSong.pause()
    console.log("previous clicked")
    console.log(currentSong)
    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if ((index-1) >= 0) {
        playMusic(songs[index-1])
        
    }

})


next.addEventListener("click",()=>{
    currentSong.pause()
    console.log("next clicked")
    console.log(currentSong)
    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if ((index+1) < songs.length) {
        playMusic(songs[index+1])
        
    }

})


document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    console.log(e, e.target,e.target.value)
    currentSong.volume = parseInt(e.target.value)/100
})







main()




