'use strict';
function startListener () {
	$('form').submit(function(event){
		event.preventDefault();
		var searchText = $('input[type=text]').val();
		console.log(searchText);
		queryAPI(searchText, displayResults);
	});
}

function queryAPI (searchText, callback) {
	var params = {
		part: 'snippet',
		key: 'AIzaSyA2KSl4pDb10IVZgFl9dgTGMH0sH2C143w',
		q: searchText,
		type: 'video',
		maxResults: '24'
	};
	$.getJSON('https:www.googleapis.com/youtube/v3/search', params, callback);

}

function displayResults (data) {
	console.log(data);
	console.log($('form'));
	$('div .images').children().remove();
	$('.searchresults').removeAttr('hidden');
	for ( var i=1 ; i <= data.items.length ; i++) {
		var item = data.items[i-1].snippet.thumbnails.medium.url;
		var videoLink = 'https://www.youtube.com/embed/' + data.items[i-1].id.videoId  + '?autoplay=1'
		var renderHTML = '<a href = ' + videoLink + ' target = "_blank" > <img src=\'' + item + '\' alt="search result image"> </a>';
		$('div .images').append(renderHTML);
	}
}

$(function () {
	startListener();
});