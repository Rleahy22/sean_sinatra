$(document).ready(function() {

  function appendVideo() {
    var videoDiv = '<div class="player"><button id="close">X</button></div><iframe id="index-vid" width="700" height="394" src="//www.youtube.com/embed/PCy4f99hxEc?autoplay=1" frameborder="0" allowfullscreen></iframe>';

    $('body').append('<div class="opaque"></div>');
    $('body').append(videoDiv);

    $( "#close" ).animate({ left: "+=800" }, 1, function() {
      return;
    });
  }

  function removeVideo() {
    $('.opaque').remove();
    $('.player').remove();
    $('#index-vid').remove();
  }

  $("#index-video").click(function() {
    appendVideo();
  });

  $('body').on('click', '#close', function(){
    removeVideo();
  });

  $('#seed').on('click', function() {
    for (var i = 0; i < 16; i++) {
      var name = prompt("Seed" + (i + 1));
      if (name != "" && name === null) {
        break;
      } else {
        $('#team' + (i + 1)).html(name);
      }
    }
  });

  $('.round').on('click', '.team', function() {
    var winner = $(this).html();
    var matchup = $(this).parent().attr('id').substring(1);
    console.log(matchup);
    $('#w' + matchup).html(winner);
  })
});
