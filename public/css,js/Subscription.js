const channelContainer = document.getElementById('channel-section');


let lastLoadedIndex = 0; 
const channelsPerPage = 6; 

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMorechannels();
    }
});

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
    fetch('public/data/subscriptions.json')
        .then(response => response.json())
        .then(channelData => {
            const totalchannels = channelData.length;
            if (lastLoadedIndex < totalchannels) {
                const remainingchannels = totalchannels - lastLoadedIndex;
                const channelsToLoad = remainingchannels > channelsPerPage ? channelsPerPage : remainingchannels;
                const channelSlice = channelData.slice(lastLoadedIndex, lastLoadedIndex + channelsToLoad);
                channelSlice.forEach(channel => {
                    const subscriptioncardhtml = subscriptioncard(channel);
                    channelContainer.innerHTML += subscriptioncardhtml;
                });
                lastLoadedIndex += channelsToLoad;
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
};

loadMorechannels();





