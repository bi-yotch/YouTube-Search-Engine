//Youtube API v3
//AIzaSyC2TZCfK6Ydci9XdF9hvTdehRcHETykVv4
$(document).ready(function(){

  var searchField = $('#query'), icon = $('#search-btn');

  $(searchField).on('focus', function(){
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 500)
  });

  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width: '45%'
      }, 400, function(){});

      $(icon).animate({
        right: '357px'
      }, 360, function(){});
    }
  });

  $('#search-form').submit(function(e){
    e.preventDefault(); //Kind of like return false.
  });

})

//Surprisingly kind of outside the area:
  function search(){
    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    //Get form input
    q = $('#query').val();

    //Run GET request on the API
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        maxResults: 7, //length, in console, refer to Search: list
        key: "AIzaSyC2TZCfK6Ydci9XdF9hvTdehRcHETykVv4"},
      function(data){
        var nextPageToken = data.nextPageToken; //Use dataDOT to access whatever you want
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item); //Will have all item information
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons); //Display buttons

      }

    );

  }

  function getOutput(item){
    var videoId = item.id.videoId; //Asked for snippet in id, line 45, item{}
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url; //High quality thumbnail ka url
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //Building output thingy
    var output = '<li>' +
    '<div class="list-left">' +
    '<a class="fancybox fancybox.iframe" data-fancybox="gallery" href="https://www.youtube.com/embed/'+videoId+'"><img src="'+thumb+'"></a>' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class="fancybox fancybox.iframe" data-fancybox="gallery" href="https://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
    //Doesn't work without target_blank
    '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
    '<p>'+description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearFix"></div>' ;

    return output;
  }

  function getButtons(prevPageToken, nextPageToken){
    var btnOutput = '';

    if(!prevPageToken)
      btnOutput = '<div class="button-container">' +
      '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
      'onclick="nextPage()">Next Page</button>' +
      '</div>' ;
    else
      btnOutput = '<div class="button-container">' +
      '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
      'onclick="prevPage()">Previous Page</button>' +
      '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
      'onclick="nextPage()">Next Page</button>' +
      '</div>' ;

    return btnOutput;
  }

  function nextPage(){
    var token = $('#next-button').data('token'); //Comes from the data attribute, data-token, use the data function
    var q = $('#next-button').data('query');

    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        maxResults: 7,
        pageToken: token,
        key: "AIzaSyC2TZCfK6Ydci9XdF9hvTdehRcHETykVv4"},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);

      }

    );

  }

  function prevPage(){
    var token = $('#prev-button').data('token'); //Comes from the data attribute, data-token, use the data function
    var q = $('#prev-button').data('query');

    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        maxResults: 7,
        pageToken: token,
        key: "AIzaSyC2TZCfK6Ydci9XdF9hvTdehRcHETykVv4"},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);

      }

    );

  }

;
