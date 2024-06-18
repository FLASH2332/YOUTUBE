/*
function loadContent() {
    window.addEventListener('scroll', async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 200) {
            await loadMoreVideos();
        }
    });
    loadMorechannels();
    loadMoreVideos();
}

let lastLoadedIndex = 0; 
const videosPerPage = 12; 
let lastLoadedCommentIndex = 0; 
const commentPerPage = 6;
const loadMoreVideos = () => {
    fetch('static/data/videos.json')
        .then(response => response.json())
        .then(videoData => {
            const totalVideos = videoData.length;
            if (lastLoadedIndex < totalVideos) {
                const remainingVideos = totalVideos - lastLoadedIndex;
                const videosToLoad = remainingVideos > videosPerPage ? videosPerPage : remainingVideos;
                const videosSlice = videoData.slice(lastLoadedIndex, lastLoadedIndex + videosToLoad);
                videosSlice.forEach(video => {
                    makeVideoCard(video);
                });
                lastLoadedIndex += videosToLoad;
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
};

const makeVideoCard = (data) => {
    videoElement = `<div class="videoTag">
                        <img src="${data.id}">
                        <div class="videoInfo">
                            <a class="Title" href="/youtube-clone/<%= currentuserid %>/videos/<%= video._id %>"><p ><%= video.videotitle %></p></a>
                            <a class="subInfo" href="/youtube-clone/<%= currentuserid %>/channels/<%= video.userid %>"><p >${data.channelName}</p></a>
                            <div class="bottomVideoInfo">
                                <p class="subInfo bottomInfo">${data.views}</p>
                            </div>
                        </div>
                    </div>
                    `

    const a = document.getElementById("subContent");
    if(!a)
        console.log("nope");
    else
        a.innerHTML+=videoElement;
};

const subscriptioncard =(data) =>{
    return `
    <div class="subscription-container">
    <img class="profile-pic" src='${data.channelThumbnail}'>
    <div class="details">
        <p class="channel-name">${data.title}</p>
        <div class="count">
        <div class="views">${data.views}</div>&nbsp;•&nbsp;<div class="subscriber-count">${data.subscribers}</div>
        </div>
        <div class="description"><p>${data.description}</p></div>
    </div>
</div>
    `;
}

const loadMorechannels = () => {
    fetch('static/data/subscriptions.json')
        .then(response => response.json())
        .then(channelData => {
            const totalchannels = channelData.length;
            const channelSlice = channelData.slice(0,3);
            channelSlice.forEach(channel => {
                const subscriptioncardhtml = subscriptioncard(channel);
                document.getElementById("subContent").innerHTML += subscriptioncardhtml;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
};
*/
document.body.onload = loadContent;

