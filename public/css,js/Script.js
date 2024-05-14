const videoContainer = document.getElementById('video-section');
const videocard=document.getElementsByClassName('video-container');


let lastLoadedIndex = 0; 
const videosPerPage = 12; 

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreVideos();
    }
});

const loadMoreVideos = () => {
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


const makeVideoCard = (data) => {
    return `
    <div class="video-container">
        <div class="videoContainer">
            <img class="videos"  src='${data.id}'>
            <video class="video">
                <source src="" type="video/mp4">
            </video>
        </div>
    <div class="video-description"> 
    <div class="channel-dp-container-2"> 
        <img src="${data.channelThumbnail}" class="channel-dp-2" alt="">
    </div> 
        <div class="video-details">
                <a class="video-title" >${data.title}</a>
                <p class="channel-name" >${data.channelName}</p>
                <p class="views">${data.views}</p> 
                <p class="time">${returnDateForDesc(parseInt(data.time))}</p>
        </div>
    </div>
    </div>`;
};

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




