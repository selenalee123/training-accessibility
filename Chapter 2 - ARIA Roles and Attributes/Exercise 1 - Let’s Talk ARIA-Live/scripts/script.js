import songData from './data.json' with { type: "json" };

const musicPlayer = {
    songs: [],
    currentSong: {}
}

const updateCurrentSong = (newSong) => {
    musicPlayer.currentSong = { ...newSong };
    document.getElementById('songTitle').innerText = newSong.title;
    document.getElementById('songArtist').innerText = newSong.artist
}

const handleSongChange = (direction) => {
    const currentIndex = musicPlayer.songs.findIndex(song => song.title === musicPlayer.currentSong.title);
    const lastIndex = musicPlayer.songs.length - 1;
    if (direction === 'next') {
        const newSong = currentIndex !== lastIndex
            ? musicPlayer.songs[currentIndex + 1]
            : musicPlayer.songs[0]
        updateCurrentSong(newSong)
    } else if (direction === 'previous') {
        const newSong = currentIndex !== 0
            ? musicPlayer.songs[currentIndex - 1]
            : musicPlayer.songs[lastIndex]
        updateCurrentSong(newSong)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    musicPlayer.songs = [...songData.songs];
    updateCurrentSong(songData.songs[0]);
});

document.getElementById('play').addEventListener('click', () => {
    const playerControls = document.getElementById('playerControls');
    const playStatus = playerControls.dataset.status;
    const isPlaying = playStatus === 'playing';
    const playButton = document.getElementById('play');

    playButton.setAttribute('aria-label', isPlaying ? 'pause' : 'play')
    playerControls.setAttribute('data-status', isPlaying ? 'paused' : 'playing');
})

document.getElementById('previous').addEventListener('click', () => handleSongChange('previous'))

document.getElementById('next').addEventListener('click', () => handleSongChange('next'))