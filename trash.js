const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.side-bar');
const linkTexts = document.querySelectorAll('.link-text');
const linkers=document.getElementsByClassName("links")
sidebar.classList.toggle('show');
toggleBtn.addEventListener('click', () => {
    linkTexts.forEach(linkText => {
        linkText.classList.toggle('show-text');
    });
    linkers.forEach(link => {
        link.classList.toggle('hover-effect');
    });
});
let lastLoadedIndex = 0; 
const videosPerPage = 12; 

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreVideos();
    }
});

const loadMoreVideos = () => {
    fetch('data/videos.json')
        .then(response => response.json())
        .then(videoData => {
            const totalVideos = videoData.length;
            if (lastLoadedIndex < totalVideos) {
                const remainingVideos = totalVideos - lastLoadedIndex;
                const videosToLoad = remainingVideos > videosPerPage ? videosPerPage : remainingVideos;
                const videosSlice = videoData.slice(lastLoadedIndex, lastLoadedIndex + videosToLoad);
                videosSlice.forEach(video => {
                    const videoCardHtml = makeVideoCard(video);
                    videoContainer.innerHTML += videoCardHtml;
                });
                lastLoadedIndex += videosToLoad;
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
};

// Initial loading of videos
loadMoreVideos();



const makeVideoCard = (data) => {
    return `
    <div class="video-container">
    <img class="videos"  src='${data.id}'>
    <div class="video-description"> 
    <div class="channel-dp-container-2"> 
        <img src="${data.channelThumbnail}" class="channel-dp-2" alt="">
        </div> 
        <div class="video-details">
                <a class="video-title">${data.title}</a>
                <p class="channel-name">${data.channelName}</p>
                <p class="views">${data.views}</p>
                <p class="time">${data.time}</p>
        </div>
    </div>
    </div>`;
};
const videoContainer = document.getElementById('video-section');

