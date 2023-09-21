const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progress__container = document.querySelector('.progress__container'),
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
