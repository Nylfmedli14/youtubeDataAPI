const thinkfulTubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';
// let credential = 'AIzaSyBYaKcbWdhwz6AZcyejQ835sSUiTWR8BAo';

function getDataFromApi(searchTerm, callback) {
  	 const request = {
  		part: 'snippet',
  		key: 'AIzaSyBYaKcbWdhwz6AZcyejQ835sSUiTWR8BAo',
  		q: searchTerm,
  		maxResults: 25
  	}
    $.getJSON(thinkfulTubeSearchURL, request, callback); 
}

function renderResult(result) {
  console.log(result)
  // return 
  // 	$('items.snippet.thumbnails.medium.url');
  let resultURL;

  if (result.id.kind == "youtube#video") {
    resultURL = `https://youtu.be/${result.id.videoId}`
  }

  else if (result.id.kind == "youtube#channel") {
    resultURL = `https://youtube.com/channel/${result.id.channelId}`
  }

    return `
      <div>
        <img src="${result.snippet.thumbnails.medium.url}">
        <a class="js-result-name" href="${resultURL}" target="_blank">${result.snippet.title}</a>
    `
};

function displayThinkfulTubeSearchData(data) {
  console.log(data)
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    // console.log($(event.currentTarget));
    const searchTarget = $(event.currentTarget).find('.js-query');
    const request = searchTarget.val();
    // clear out the input
    searchTarget.val("");
    getDataFromApi(request, displayThinkfulTubeSearchData);
  });
}

$(watchSubmit);
