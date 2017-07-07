chrome.extension.sendMessage({}, function(response) {

  // ----------------------------------------------------------
  // This part of the script triggers when page is done loading
  console.log('BIRP! Track Downloader Loaded');
  // ----------------------------------------------------------

  function createDownloadLink(artist, title, trackUrl) {
    var downloadLink = document.createElement('a');
    downloadLink.classList.add('appended-download-link');
    downloadLink.href = trackUrl;
    downloadLink.target = '_blank';
    downloadLink.download = artist + ' - ' + title;
    downloadLink.title = 'Download Track Title by ' + artist;
    downloadLink.style.cssText = 'color: #777; font-size: 16px; margin-left:10px;';

    var icon = document.createElement('i');
    icon.classList.add('fa', 'fa-download');
    icon.style.cssText = 'margin-right:3px;';
    downloadLink.appendChild(icon);

    var label = document.createElement('span');
    label.innerText = 'Download';
    downloadLink.appendChild(label);

    return downloadLink;
  }

  function getTrackUrl(trackContainer) {
    var baseUrl = 'http://www.birp.fm/music/m/playlists';
    var trackId = trackContainer.querySelector('.track-playbutton').getAttribute('id');
    return baseUrl + '/' + trackId;
  }

  function getTitle(trackContainer) {
    var title = trackContainer.querySelector('.song-title').innerText;
    return title;
  }

  function getArtist(trackContainer) {
    var artist = trackContainer.querySelector('.song-artist').innerText;
    return artist;
  }

  //Add download link to tracks
  function addDownloadLinks() {

    //Get all single tracks on page
    var playlist = document.querySelector('.playlist');
    var tracks = playlist ? playlist.getElementsByClassName('track') : [];

    //Loop through all the tracks
    for (var i = 0; i < tracks.length; ++i) {
      var trackContainer = tracks[i];

      //Get track meta
      var trackUrl = getTrackUrl(trackContainer);
      var title = getTitle(trackContainer);
      var artist = getArtist(trackContainer);

      //Create a download link
      var downloadLink = createDownloadLink(artist, title, trackUrl);

      //Add download link to each track
      trackContainer.appendChild(downloadLink);
    }
  }

  //Fire functions on load
  addDownloadLinks();

  //Polling to check if page changed
  var location = window.location.href;
  var pollInterval = 1000; //1s
  var polling = setInterval(function() {
    //If the href changes
    if (window.location.href !== location) {
      location = window.location.href;
      addDownloadLinks();
    }
  }, pollInterval);

});
