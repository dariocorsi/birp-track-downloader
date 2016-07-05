chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log('BIRP! Track Downloader Loaded');
            // ----------------------------------------------------------

            var tracks = document.getElementsByClassName('fap-single-track');

            var arr = [].slice.call(tracks);

            var alpha = arr.filter(function(element) {
                return element.getAttribute('title');
            }).map(function(element) {
                return element.innerText.trim();
            }).sort();

            console.log(alpha);

            //Get the year and month based on current url structure. Should replace with smarter function.
            var pathname = window.location.pathname.split('/');
            var year = pathname[2];
            var month = getMonth(pathname[3]);
            var playlistName = pathname[3];

            //Get the month from a string
            function getMonth(str) {
                var month = str.split('-');
                return month[0];
            }

            //Add download link to tracks
            for (var i = 0; i < tracks.length; ++i) {
                var element = tracks[i];

                //Make sure the track has a title
                if (element.getAttribute('title')) {
                    var trackTitle = element.getAttribute('title');
                    var trackUrl = trackTitle.replace(/\s/g, '%20');
                    var downloadLink = document.createElement('a');
                    downloadLink.classList.add('appended-download-link');
                    downloadLink.href = 'http://www.birp.fm/music/m/playlists/' + year + '/' + month + '-' + year + '/' + trackUrl + '.mp3';
                    downloadLink.target = '_blank';
                    downloadLink.download = trackTitle;
                    downloadLink.innerText = 'Download Track';
                    downloadLink.style.cssText = 'color: #999; font-size: 12px; margin-left:8px;';
                    element.parentNode.appendChild(downloadLink);
                }
            }

        }
    }, 10);
});
