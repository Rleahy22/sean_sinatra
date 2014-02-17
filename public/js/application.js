$(document).ready(function() {
  var seeds = [];

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

  $('#seed').on('keyup', function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      addSeed();
    }
  });

  function addSeed() {
    var seed = $('#seed').val();
    seeds.push(seed);

    $('#list').show();
    $('.bracket').hide();
    $('#list').append('<li class="idea">' + seed + '</li>');
    $('#seed').val('');
    $('#seed').focus();
  }

  function bracketNumber(numSeeds) {
    $('#list').hide();
    $('#bracket' + numSeeds).show();
  }

  $('#add').on('click', function() {
    addSeed();
  });

  $('#begin').on('click', function() {
    var numSeeds = seeds.length;

    if (numSeeds < 4) {
      alert("Please enter at least 4 ideas to begin a tournament.");
      $('#seed').focus();
    } else {

        if (numSeeds <= 8 && numSeeds > 4) { 
          for (var i = 1; seeds.length < 8; i += 2) {
            seeds.splice(i, 0, "(bye)");
          }
        } else if (numSeeds <= 16 && numSeeds > 4) {
          for (var i =1; seeds.length < 16; i +=2) {
            seeds.splice(i, 0, "(bye)");
          }
        }

      numSeeds = (Math.ceil(numSeeds / 4)) + 1;
      numSeeds = Math.pow(2, numSeeds);
      console.log(numSeeds);
      bracketNumber(numSeeds);

    }

    for (var seed in seeds) {
      var index = parseInt(seed) + 1;
      $('.team' + index).html(seeds[seed]).effect("highlight", {}, 750);
    }

    for (var j = 1; j < 17; j++) {
      var team = $('.team' + j);
      var otherTeam = $('.team' + (j - 1)).html();

      if (team.html() === "(bye)") {
        var matchup = team.parent().attr('class').substring(9);
        $('.w' + matchup).html(otherTeam);
      }
    }

  });


  $('#tournament').on('click', '.team', function() {
    var winner = $(this).html();
    var matchup = $(this).parent().attr('class').substring(9);
    $('.w' + matchup).html(winner).effect("highlight", {}, 750);
  })
});
