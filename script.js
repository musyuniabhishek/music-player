
var array = [{
    thumbnail: "img-1.jpg",
    url: "song 1.mp3",
    title: "Song No. 1",
    id: 0
}, {
    thumbnail: "img-2.jpg",
    url: "song 2.mp3",
    title: "Song No. 2",
    id: 1
}, {
    thumbnail: "img-3.jpg",
    url: "song 3.mp3",
    title: "Song No. 3",
    id: 2
}, {
    thumbnail: "img-4.jpg",
    url: "song 4.mp3",
    title: "Song No. 4",
    id: 3
}, {
    thumbnail: "img-5.jpg",
    url: "song 5.mp3",
    title: "Song No. 5",
    id: 4
}, {
    thumbnail: "img-6.jpg",
    url: "song 3.mp3",
    title: "Song No. 6",
    id: 5
}]

var thumbnail = document.querySelector(".thumbnail")
var title = document.querySelector(".title")
var prev = document.querySelector(".prev")
var next = document.querySelector(".next")
var playBtn = document.querySelector(".play")
var progressBar = document.querySelector(".progress-bar")
var currentTime = document.querySelector(".current-time")
var totalTime = document.querySelector(".total-time")
var progress = document.querySelector(".progress")
var song;
var search = document.querySelector(".search")
var searchBtn = document.querySelector(".searchBtn")
var soundBtn = document.querySelector(".soundBtn")
function music(id) {
    let i = id
    title.innerText = array[i].title;
    thumbnail.src = array[i].thumbnail;
    if(song) {
        song.pause()
        song = new Audio(array[i].url);
        song.play()
        playBtn.innerText = "pause"
        playBtn.addEventListener("click", function() {
            if(playBtn.innerText === "play_arrow") {
                playBtn.innerText = "pause"
                song.play()


            }
            else {
                playBtn.innerText = "play_arrow"
                song.pause()
            }

        })
        soundBtn.addEventListener("click", function() {
            if(soundBtn.innerText === "volume_up") {
                soundBtn.innerText = "volume_off"
                song.volume = 0
            }
            else {
                soundBtn.innerText = "volume_up"
                song.volume = 1
            }
        })

    } else {
        song = new Audio(array[i].url);

    }
    setInterval(() => {
        currentTime.innerText = countTime(song.currentTime)
        totalTime.innerText = countTime(song.duration)
        progressBar.style.width = `${(song.currentTime / song.duration) * 100}%`
        document.querySelector(".sound-bar").style.width = Math.floor((song.volume * 100)) + "%"
        document.querySelector(".sound-bar").innerText = Math.floor((song.volume * 100)) + "%"
    }, 1000)
    playBtn.addEventListener("click", function() {
        if(playBtn.innerText === "play_arrow") {
            playBtn.innerText = "pause"
            song.play()
            setInterval(() => {
                currentTime.innerText = countTime(song.currentTime)
                totalTime.innerText = countTime(song.duration)
                progressBar.style.width = `${(song.currentTime / song.duration) * 100}%`
            }, 1000)

        }
        else {
            playBtn.innerText = "play_arrow"
            song.pause()
        }
    })


    next.addEventListener("click", function() {
        (i >= array.length - 1) ? i = 0 : i++;
        title.innerText = array[i].title;
        thumbnail.src = array[i].thumbnail;
        song.pause()
        song = new Audio(array[i].url);
        song.play()
        playBtn.innerText = "pause"
    })

    prev.addEventListener("click", function() {
        (i == 0) ? i = array.length - 1 : i--;
        title.innerText = array[i].title;
        thumbnail.src = array[i].thumbnail;
        song.pause()
        song = new Audio(array[i].url);
        song.play()
    })

    soundBtn.addEventListener("click", function() {
        if(soundBtn.innerText === "volume_up") {
            soundBtn.innerText = "volume_off"
            song.volume = 0
        }
        else {
            soundBtn.innerText = "volume_up"
            song.volume = 1
        }
    })


    function countTime(time) {
        let totalSeconds = time;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        minutes = String(minutes).padStart(2, "0");
        hours = String(hours).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return (minutes + ":" + Math.round(seconds));
    }

    var progress = document.querySelector(".progress")
    progress.addEventListener('click', function(e) {
        var percentage = Math.floor((e.offsetX / progress.offsetWidth) * 100);
        song.currentTime = song.duration * (percentage / 100);
        progressBar.style.width = `${percentage}%`
    })

    var volume = document.querySelector(".volume")
    volume.addEventListener('click', function(e) {
        var percentage = Math.floor((e.offsetX / progress.offsetWidth) * 200);
        song.volume = percentage / 15
        document.querySelector(".sound-bar").style.width = `${percentage * 7}%`
        document.querySelector(".sound-bar").innerText = Math.floor((song.volume * 100)) + "%"
        soundBtn.innerText = "volume_up"
    })
}

var cards = document.querySelector(".cards")
array.map((item, index) => {
    cards.innerHTML += `<div class=" col-lg-2 col-md-3 col-sm-4 my-3" >
    <div class="card border-0  mb-4" style="height: 250px;" onclick="playMusic(${index})" >
        <div class="text-center position-relative img" style="height: 180px;">
            <img src="${item.thumbnail}" class=" card-img-top w-75 h-100 object-fit-contain" alt="..." >
            <div class="hover w-100 h-100 position-absolute left-0 top-0">
            <div class="text-center mt-5 ">
                <span class="material-symbols-outlined mt-3 text-light fs-1">
                    play_circle
                </span>
            </div>
        </div>
        </div>
        <div class="card-body">
            <h6 class="card-text text-center">${item.title}</h6>
            <p class="text-center">Description</p>
        </div>
    </div>
</div>`
})

function playMusic(id) {

    music(id)
}

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    if(search.value === "") {
        window.location.href = "index.html"
    }
    else {
        var res = array.map((item) => item).filter((item) => item.title === search.value)
        if(res.length == 0) {
            cards.innerHTML = `<div class="container">
            <div class="bg-success row align-items-center p-2 text-light my-3">
            <div class=" position-absolute float-left  ">
            <a href="index.html" class="text-decoration-none text-light">
            <h2>&larr;</h2>
        </a>
            </div>
            <h6 class="text-center">No results Found</h6>
        </div>
        </div>`
        }
        else {
            res.map((item) => {
                cards.innerHTML = `<div class="container">
            <div class="bg-success row align-items-center p-2 text-light my-3">
            <div class=" position-absolute float-left  ">
            <a href="index.html" class="text-decoration-none text-light">
            <h2>&larr;</h2>
        </a>
            </div>
            <h6 class="text-center">Search Results</h6>
        </div>
        </div>
            <div class=" col-lg-2 col-md-3 col-sm-4  my-3 " >
            <div class="card border-0" style="height: 250px;" onclick="playMusic(${item.id})" >
                <div class="p-2" style="height: 180px;">
                    <img src="${item.thumbnail}" class=card-img-top w-75 h-100 object-fit-contain alt="..." >
                </div>
                <div class="card-body">
                    <h6 class="card-text text-center">${item.title}</h6>
                    <p class="text-center">Description</p>
                </div>
            </div>
        </div>`
            })
        }
    }
})

