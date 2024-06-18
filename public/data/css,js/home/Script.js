const videoContainer = document.getElementById('video-section');
const videocard = document.getElementsByClassName('video-container');


let lastLoadedIndex = 0;
const videosPerPage = 12;

const makeVideoCard = (data) => {
    return `
    <div class="video-container">
        <div class="videoContainer">
            <a href="/youtube-clone/${data.currentUserId}/videos/${data._id}"><img class="videos"  src='${data.thumbnail}'></a>
        </div>
    <div class="video-description"> 
    <div class="channel-dp-container-2"> 
        <a href="/youtube-clone/${data.currentUserId}/channels/${data.userid}"><img src="${data.userprofilepic}" class="channel-dp-2" alt=""></a>
    </div>
        <div class="video-details">
                <a href="/youtube-clone/${data.currentUserId}/videos/${data._id}" class="video-title" >${data.videotitle}</a>
                <a href="/youtube-clone/${data.currentUserId}/channels/${data.userid}"><p class="channel-name" >${data.username}</p></a>
                <p class="views">${data.views} views</p> 
                <p class="time">${returnDateForDesc(parseInt(data.time))}</p>
        </div>
    </div>
    </div>`;
};

let loadedVideos = []
let isLoadingMore = false;
window.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (!isLoadingMore && scrollTop + clientHeight >= scrollHeight - 200) {
        isLoadingMore = true
        await loadMoreVideos();
        isLoadingMore = false
    }
});

const loadMoreVideos = async () => {
    /*
        fetch('public/data/videos.json')
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
    */
    const currentPath = window.location.pathname
    const currentUserId = currentPath.split('/').at(-1)

    try {
        const response = await fetch('/youtube-clone/fetch/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loadedVideos, currentUserId })
        })
        const videos = await response.json()
        videos.forEach(video => {
            loadedVideos.push(video)
            videoContainer.innerHTML += makeVideoCard(video)
        })
        //console.log(JSON.stringify({ loadedVideos }))
    } catch (err) {
        console.log("err");
    }
};
loadMoreVideos();

function returnDateForDesc(date) {
    let minute = Math.floor(date / 60);
    let hour = Math.floor(minute / 60);
    let day = Math.floor(hour / 24);
    let month = Math.floor(day / 30);
    let year = Math.floor(month / 12);

    if (year < 1) {
        if (month < 1) {
            if (day < 1) {
                if (hour < 1)
                    return minute + " minutes ago";
                return hour + " hours ago";
            }
            return day + " days ago";
        }
        return month + " months ago";
    }
    return year + " years ago";
}


// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOM Loaded");
//     const arr = document.querySelectorAll('.video-container');
//     console.log("Number of video containers found:", arr.length);
//     Array.from(arr).forEach(element => {
//         console.log("Processing video container");
//         element.addEventListener("mouseover", async function(event) {
//             console.log("Mouseover event");
//             const video = element.querySelector(".video");
//             if (!video) {
//                 console.error("Video element not found");
//                 return;
//             }
//             const source = video.querySelector("source");
//             if (!source || !source.src) {
//                 console.error("Video source not found or empty");
//                 return;
//             }
//             video.play();
//             console.log("Video played");
//         });
//         element.addEventListener("mouseout", function(event) {
//             console.log("Mouseout event");
//             const video = element.querySelector(".video");
//             if (video) {
//                 video.pause();
//                 video.currentTime = 0;
//                 console.log("Video paused and reset");
//             }
//         });
//     });
// });


let xx = document.querySelector('.search-btn')
let yy = document.querySelector('.search-bar')
xx.addEventListener('click', async () => {
    console.log(yy.value);
    let inputvalue = yy.value
    const currentPath = window.location.pathname
    const currentUserId = currentPath.split('/').at(-1)
    try {
        const response = await fetch('/youtube-clone/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId, inputvalue })
        })
        console.log('11111111');
        const url = response.json()
        window.location = `/youtube-clone/${currentUserId}/searched`
        //console.log(JSON.stringify({ loadedVideos }))
    } catch (err) {
        console.log(err);
    }
})
