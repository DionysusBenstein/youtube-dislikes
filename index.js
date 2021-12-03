// ==UserScript==
// @name         Show dislikes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

const api = {
    key: 'AIzaSyAVN_3fb0ILGbsiy8kusj0DbOxgdtNEH2I',
}

async function getVideoInfo(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${api.key}&part=statistics`);
    return await response.json();
}

async function updateDislikes(videoId) {
    const videoInfo = await getVideoInfo(videoId);
    const dislikeCount = videoInfo.items[0].statistics.dislikeCount;
    const dislikeButton = document.querySelectorAll('yt-formatted-string#text.ytd-toggle-button-renderer')[1];

    if (dislikeCount >= 1000000) {
        dislikeButton.innerText = `${Math.trunc(dislikeCount / 1000000)}M`;
    } else if (dislikeCount >= 1000) {
        dislikeButton.innerText = `${Math.trunc(dislikeCount / 1000)}K`;
    }

    dislikeButton.addEventListener('click', e => {
        // let isDisliked = false;

        // if (isDisliked) {
        //     e.target.innerText = parseInt(e.target.innerText) + 1;
        //     isDisliked = true;
        // } else {
        //     e.target.innerText = parseInt(e.target.innerText) - 1;
        // }

        console.log('click');
    });
}

(function() {
    'use strict';

    let videoId;
    let temp;

    setInterval(() => {
        if (window.location.href.includes('watch')) {
            videoId = window.location.href.split('=')[1];

            if (videoId !== temp) {
                updateDislikes(videoId);
                temp = videoId;
            }
        }
    }, 1000);
})();
