const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src')

const songs = ["Beyonce Don't Hurt Yourself", "Dualipa Don't start now", "Queen We are the Champions"]      

let songIndex = 0

function loadSong(song) {
    title.innerHTML = song
    audio.src = `assets/audio/${song}.mp3`
    cover.src = `assets/img/cover${songIndex + 1}.png`
}
loadSong(songs[songIndex])

function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    imgSrc.src = 'assets/img/pause.png'
    audio.play()
}

function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    imgSrc.src = 'assets/img/play.png'
    audio.pause()
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()  
    } else {
    playSong()
    }
})

function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
} 
nextBtn.addEventListener('click', nextSong)

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
} 
prevBtn.addEventListener('click', prevSong)

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

// timeset

audio.addEventListener("loadeddata", () => {
      player.querySelector(".time .length").textContent = getTimeCodeFromNum(
        audio.duration
      );
    },
    false
  );
  
 
  const timeline = player.querySelector(".progress__container");
  timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  
setInterval(() => {
    const progressBar = player.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    player.querySelector(".time .current").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
  