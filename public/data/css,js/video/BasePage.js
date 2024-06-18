const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.side-bar');
const linkTexts = document.querySelectorAll('.link-text');
const linkers = document.getElementsByClassName("links");
const cover = document.getElementById('cover');
var temp = window.innerWidth > 800 ? false : true;
var clicked = false;
const navbarThemeCheckbox = document.getElementById("navbar-theme");
const sidebarThemeCheckbox = document.getElementById("insidebar-theme");

function applyTheme(theme) {
    const body = document.body;
    if (theme === "dark") {
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
    }
}

const currentPath = window.location.pathname
const currentUserId = currentPath.split('/').at(2)
async function loadTheme() {
    let themeresponse
    try {
        const response = await fetch('/youtube-clone/fetch/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId })
        })
        themeresponse = await response.json();
        // console.log(themeresponse.theme);
    } catch (err) {
        console.log(err);
    }
    applyTheme(themeresponse.theme);
    navbarThemeCheckbox.checked = themeresponse.theme == 'dark'
}

loadTheme()

async function syncCheckboxes(sourceCheckbox, targetCheckbox) {
    targetCheckbox.checked = sourceCheckbox.checked;
    applyTheme(sourceCheckbox.checked ? "dark" : "light");
    try {
        const response = await fetch('/youtube-clone/put/theme', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId, theme: sourceCheckbox.checked ? "dark" : "light" })
        })
    } catch (err) {
        console.log(err);
    }
}

navbarThemeCheckbox.addEventListener("change", function () {
    syncCheckboxes(navbarThemeCheckbox, sidebarThemeCheckbox);
});

sidebarThemeCheckbox.addEventListener("change", function () {
    syncCheckboxes(sidebarThemeCheckbox, navbarThemeCheckbox);
});

toggleBtn.addEventListener('click', () => {
    clicked = true;
    linkTexts.forEach(linkText => {
        linkText.classList.toggle('show-text');
    });
    cover.classList.toggle('show');
    sidebar.classList.toggle('show');
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 800 && !temp) {
        sidebar.classList.remove('show');
        linkTexts.forEach(linkText => {
            linkText.classList.remove('show-text');
        });
        cover.classList.remove('show');
        temp = true;

    } else if (window.innerWidth >= 800 && temp) {
        temp = false;
    }
});

cover.addEventListener('click', () => {
    if (clicked == true) {
        cover.classList.toggle('show');
        linkTexts.forEach(linkText => {
            linkText.classList.toggle('show-text');
        });
        clicked = false;
    }
    sidebar.classList.toggle('show');
});



function loadContent() {
    var r = document.querySelector(':root');
    var descExtend = document.getElementById("descriptionExtend");
    var descMain = document.getElementById("descriptionMain");

    const manageDesc = () => {
        let mainVideoInfoHeight = window.innerWidth <= 500 ? 150 : 100;
        let descMainInitHeight = descMain.offsetHeight + 20;

        r.style.setProperty('--mainVideoInfoHeight', mainVideoInfoHeight + 'px');
        r.style.setProperty('--descriptionHeight', mainVideoInfoHeight + descMainInitHeight + 'px');
    }
    manageDesc();
    descExtend.addEventListener('click', () => {
        descMain.classList.toggle("extended");
        let isExtended = descMain.classList.contains("extended");
        descExtend.innerHTML = (!isExtended) ? "Show more" : "Show less";
        if (!descMain.classList.contains("extended"))
            document.getElementById("mainVideo").scrollIntoView({ behavior: "smooth" });

        manageDesc();
    });
    onresize = () => {
        manageDesc();
    };

    document.getElementById("commentsToggle").addEventListener('click', () => {
        document.getElementById("comments").classList.toggle("toggled");
        document.getElementById("subContent").classList.toggle("toggled");
        document.getElementById("commentsToggle").textContent = document.getElementById("subContent").classList.contains("toggled") ? "Videos" : "Comments";
    });

    let isLoadingMore = false;
    window.addEventListener('scroll', async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (!isLoadingMore && scrollTop + clientHeight >= scrollHeight - 200) {
            isLoadingMore = true
            await loadMoreComments();
            isLoadingMore = false
        }
    });
    loadMoreComments();
    loadMainVideo();
}

let lastLoadedCommentIndex = 0;
let loadedComments = []
const loadMoreComments = async () => {
    if (document.getElementById("subContent").classList.contains("toggled") || window.innerWidth > 1000) {
        const currentPath = window.location.pathname
        const currentVideoId = currentPath.split('/').at(-1)
        console.log(currentVideoId);
        try {
            const response = await fetch('/youtube-clone/fetch/videocomments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ loadedComments, currentVideoId })
            })
            const comments = await response.json()
            comments.forEach(comment => {
                loadedComments.push(comment)
                makeCommentCard(comment)
            })
        } catch (err) {
            console.log(err);
        }
    }
};
const loadMainVideo = async () => {
    const currentPath = window.location.pathname
    const currentVideoId = currentPath.split('/').at(-1)
    const currentUserId = currentPath.split('/').at(-3)
    //console.log(currentUserId, currentVideoId);
    try {
        const response = await fetch('/youtube-clone/fetch/videodetails', {  //har
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId, currentVideoId })
        })
        const videoDetails = await response.json();
        console.log(videoDetails.isSubscribed);
        loadMainVideoInfo(videoDetails);
    } catch (err) {
        console.log(err);
    }
};

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
                    return minute + " minutes";
                return hour + " hours";
            }
            return day + " days";
        }
        return month + " months";
    }
    return year + " years";
}

let likeButton = document.getElementById("likeButton");
let dislikeButton = document.getElementById("dislikeButton");
let subscribeButton = document.getElementById("subscribeButton");

const sendRequest = async () => {
    let likeButton = document.getElementById("likeButton");
    let dislikeButton = document.getElementById("dislikeButton");
    let subscribeButton = document.getElementById("subscribeButton");

    const currentPath = window.location.pathname;
    const currentVideoId = currentPath.split('/').at(-1);
    const currentUserId = currentPath.split('/').at(-3);
    const isLiked = likeButton.classList.contains("clicked");
    const isdisliked = dislikeButton.classList.contains("clicked");
    const isSubscribed = subscribeButton.classList.contains("clicked");
    try {
        const response = await fetch('/youtube-clone/put/videoMetrics', {               //har
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentVideoId, currentUserId, isLiked, isdisliked, isSubscribed })
        })
        //hasSubmitted = true;
        //return true;
    } catch (err) {
        console.log(err);
    }

};

const loadMainVideoInfo = (data) => {
    document.getElementById("videoTime").textContent = returnDateForDesc(parseInt(data.date)) + " ago";


    likeButton.addEventListener("click", () => {
        if (likeButton.classList.contains("clicked")) {
            likeButton.classList.remove("clicked");
        }
        else {
            dislikeButton.classList.remove("clicked");
            likeButton.classList.add("clicked");
        }

        sendRequest();
    });

    dislikeButton.addEventListener("click", () => {
        if (dislikeButton.classList.contains("clicked")) {
            dislikeButton.classList.remove("clicked");
        }
        else {
            likeButton.classList.remove("clicked");
            dislikeButton.classList.add("clicked");
        }

        sendRequest();
    });

    subscribeButton.addEventListener('click', (event) => {
        subscribeButton.classList.toggle("clicked");
        if (subscribeButton.classList.contains("clicked"))
            subscribeButton.textContent = "Subscribed";
        else
            subscribeButton.textContent = "Subscribe";

        sendRequest();
    });

    if (data.isLiked) {
        document.getElementById("likeButton").classList.add("clicked");
        document.getElementById("dislikeButton").classList.remove("clicked");
    }
    if (data.isDisliked) {
        document.getElementById("dislikeButton").classList.add("clicked");
        document.getElementById("likeButton").classList.remove("clicked");
    }
    if (data.isSubscribed) {
        document.getElementById("subscribeButton").classList.add("clicked");
        if (subscribeButton.classList.contains("clicked"))
            subscribeButton.textContent = "Subscribed";
        else
            subscribeButton.textContent = "Subscribe";
    }

};
const makeCommentCard = (data) => {
    commentTag = `<div class="comment">
                        <div class="commentProfilePic">
                            <img src="${data.profilepic}">
                        </div>
                        <div class="commentDetails">
                            <p class="commentName">${data.username}</p>
                            <p class="commentText">${data.comment}</p>
                        </div>
                    </div>`
    const a = document.getElementById("comments");
    if (!a)
        console.log("nope");
    else
        a.innerHTML += commentTag;
};
hasSubmitted = false;
function addCommentP(event) {
    event.preventDefault();

    const commentInput = document.getElementById("submittedComment");
    const commentText = commentInput.textContent.trim();
    if (commentText.length <= 0)
        return false;

    const currentPath = window.location.pathname;
    const currentVideoId = currentPath.split('/').at(-1);
    const currentUserId = currentPath.split('/').at(-3);

    commentTag = `<div class="comment">
                        <div class="commentProfilePic">
                            <img src="">
                        </div>
                        <div class="commentDetails">
                            <p class="commentName"></p>
                            <p class="commentText">
                            ${commentText}</p>
                        </div>
                    </div>
                    <div class="commentSeparator"></div>`
    const a = document.getElementById("comments");
    if (!a)
        console.log("nope");
    else
        a.innerHTML += commentTag;
    const addComment = async () => {
        const currentPath = window.location.pathname;
        const currentVideoId = currentPath.split('/').at(-1);
        const currentUserId = currentPath.split('/').at(-3);
        try {
            const response = await fetch('/youtube-clone/put/videocomment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentVideoId, currentUserId, commentText })

            })
            return true;
        } catch (err) {
            console.log(err);
        }
    };
    addComment();
    return false;
}
//document.body.onload = loadContent;
loadContent()

/*
***************************
***************************
Main video controls
***************************
***************************
*/

const video = document.getElementById("video");
const videoThumbnail = document.getElementById("video-thumbnail");
const playpause = document.getElementById("play-pause");
const frwd = document.getElementById("skip-10");
const bkwrd = document.getElementById("skipminus-10");
const volume = document.getElementById("volume");
const mutebtn = document.getElementById("mute");
const videoContainer = document.querySelector(".video-container");
const controls = document.querySelector(".controls");
const progressBar = document.querySelector(".progress-bar");
const playbackline = document.querySelector(".playback-line");
const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const videoCover = document.getElementById("videoCover");
const screen = document.getElementById("screen");

function fullscreenChange(element) {
    if (element.requestFullscreen()) {
        document.exitFullscreen();
    }
    else {
        element.requestFullscreen();
    }
}
fullscreen.addEventListener("click", function (event) {
    fullscreenChange(videoContainer);
});
screen.addEventListener("dblclick", function (event) {
    fullscreenChange(videoContainer);
});

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};



playpause.addEventListener("click", function () {
    togglePlayPause();
});

videoCover.addEventListener("click", function () {
    togglePlayPause();
});


function togglePlayPause() {
    var img = playpause.getElementsByTagName("img")[0];
    var playButton = document.getElementById("pbutton");
    if (video.paused) {
        videoThumbnail.style.display = "none";
        img.src = "/static/images/images/download (2).jpg";
        playButton.title = "Pause";
        video.play();
    } else {
        playButton.title = "Play";
        video.pause();
        img.src = "/static/images/images/download (1).jpg";
    }
}

document.addEventListener("keydown", function (event) {

    if (document.activeElement.id === "") {
        if (event.key === 32 || event.key === " ") {
            event.preventDefault();
            togglePlayPause();
        }
        if (event.key === "M" || event.key === "m") {
            event.preventDefault();
            toggleMute();
        }
        if (event.key === "F" || event.key === "f") {
            fullscreenChange(videoContainer);
        }
        if (event.key == 'ArrowRight') {
            event.preventDefault();
            video.currentTime += 5;
            if (video.currentTime < 0)
                video.currentTime = 0;
            else if (video.currentTime > video.duration)
                video.currentPath = 0;
        }
        if (event.key == 'ArrowLeft') {
            event.preventDefault();
            video.currentTime -= 5;
            if (video.currentTime < 0)
                video.currentTime = 0;
            else if (video.currentTime > video.duration)
                video.currentPath = 0;
        }
    }
});



video.addEventListener("ended", function () {
    playpause.innerHTML = '<i class="fa-solid fa-play"></i>';
});

// Forward 5 sec or backward 5 sec 
frwd.addEventListener("click", function () {
    video.currentTime += 5;
    if (video.currentTime < 0)
        video.currentTime = 0;
    else if (video.currentTime > video.duration)
        video.currentPath = 0;
});
bkwrd.addEventListener("click", function () {
    video.currentTime -= 5;
    if (video.currentTime < 0)
        video.currentTime = 0;
    else if (video.currentTime > video.duration)
        video.currentPath = 0;
});


mutebtn.addEventListener("click", function () {
    toggleMute();
});
function toggleMute() {
    if (video.muted) {
        video.muted = false;
        mutebtn.innerHTML = '<img src="/static/IMAGES/IMAGES/download (4).jpg"><i class="fas fa-volume-up"></i>';
        volume.value = video.volume;
    } else {
        video.muted = true;
        mutebtn.innerHTML = '<img src="/static/IMAGES/IMAGES/download (5).jpg"><i class="fas fa-volume-up"></i>';
        volume.value = 0;
    }
}


volume.addEventListener("input", function () {
    video.volume = volume.value;
    if (video.volume === 0) {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});


video.addEventListener("ended", () => {
    progressBar.style.width = "0%";
    videoThumbnail.style.display = "block";
});

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(video.currentTime);
    maxDuration.innerText = timeFormatter(video.duration);
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percentage + "%";
}, 100);

playbackline.addEventListener("click", (e) => {
    let timelineWidth = playbackline.clientWidth;
    video.currentTime = (e.offsetX / timelineWidth) * video.duration;
});


viewAdded = false;
setInterval(() => {
    const sendViewRequest = async () => {
        const currentPath = window.location.pathname
        const currentVideoId = currentPath.split('/').at(-1)
        const currentUserId = currentPath.split('/').at(-3)
        try {
            const response = await fetch('/youtube-clone/put/videoViews', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUserId, currentVideoId })
            })
        } catch (err) {
            console.log(err);
        }
    };
    if ((video.currentTime >= 15 || video.currentTime >= video.duration) && !viewAdded) {
        sendViewRequest();
        viewAdded = true;
    }
}, 1000);