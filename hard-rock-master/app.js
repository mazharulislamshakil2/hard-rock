
// const searchSongs = () => {
//     const inputValue = document.getElementById('search-filld').value;
//     const url = (`https://api.lyrics.ovh/suggest/${inputValue}`);
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySongs(data.data))
//         .catch(error =>displayError('this is wrong, try again'))
// }

const searchSongs = async () => {
    const inputValue = document.getElementById('search-filld').value;
    const url = (`https://api.lyrics.ovh/suggest/${inputValue}`);
    const res = await fetch(url)
    const data = await res.json()
    displaySongs(data.data)

}
const displayError = error => {
    const errorShow = document.getElementById('error-sms');
    errorShow.innerText = error;

}
// show ui result
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead"> ${song.artist.name}<span></span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="ShowLyric('${song.artist.name}','${song.title}' )" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
    })
}
// const ShowLyric = (artist , title ) => {
//     const url =`https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data =>ShowLyric(data.lyrics))
// }
const ShowLyric = async (artist, title) => {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url)
        const data = await res.json()
        displayLyric(data.lyrics)
    }
    catch (error) {
        displayError('plz try again ')
    }
}
const displayLyric = lyrics => {
    const lyricDiv = document.getElementById('single-lyrics');
    lyricDiv.innerText = lyrics;
}
