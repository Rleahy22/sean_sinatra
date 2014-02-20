$(document).ready(function() {
  var seeds = [];
  var began = false;
  var size = {};

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
      if (seeds.length < 16) {
        addSeed();
      } else {
        alert("Please limit the number of ideas to 16 for a single torunament.");
        $('#seed').val('');
      }
    }
  });

  function addSeed() {
    if (began) {
      alert("Please refresh the page to create a new tournament.");
    } else if ($('#seed').val() === '') {
      alert("Idea field cannot be blank");
      $('#seed').focus();
    } else {
      var seed = $('#seed').val();
      seeds.push(seed);

      $('#list').show();
      $('.bracket').hide();
      $('#list').append('<li class="idea">' + seed + '</li>');
      $('#seed').val('');
      $('#seed').focus();
    }
  }

  function bracketNumber(numSeeds) {
    var colors = ['#102D5A', '#8B8F9B']

    $('#list').hide();
    $('#bracket' + numSeeds).show();

    if (numSeeds == 4) {
      size = 4;
      $('#bracket8').remove();
      $('#bracket16').remove();
    } else if (numSeeds == 8) {
      size = 8;
      $('#bracket4').remove();
      $('#bracket16').remove();
      $('#tournament').css('height', '950px');
    } else if (numSeeds == 16) {
      size = 16;
      $('#bracket4').remove();
      $('#bracket8').remove();
      $('#tournament').css('height', '1460px');
    }

    for (var i = 1; i < 17; i++) {
      $('.m' + i + ' > .team').css('background-color', colors[(i % 2)]);
    }
  }

  function teamSize(length, element) {
    if (length > 50) {
        element.css('font-size', '10px');
      } else if (length > 20) {
        element.css('font-size', '12px');
      }
  }

  $('#goal-field').on('keyup', function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      addGoal();
    }
  });

  addGoal = function() {
    var goal = $('#goal-field').val();
    
    if (goal === '') {
      alert('Goal cannot be blank.');
      $('#goal-field').focus();
    } else {
      $('#goal-header').html(goal);
    }
  }

  $('#company-name').on('keyup', function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      addCompany();
    }
  });

  addCompany = function() {
    var company = $('#company-name').val();

    if (company === '') {
      alert('Company name cannot be blank.');
      $('#company-name').focus();
    } else {
      $('#company-header').html(company);
    }
  }

  $('#company-button').on('click', function() {
    addCompany();
  })

  $('#goal-button').on('click', function() {
    addGoal();
  })

  $('#add').on('click', function() {
    if (seeds.length < 16) {
      addSeed();
    } else {
      alert("Please limit the number of ideas to 16 for a single tournament.");
    }
  });

  $('#begin').on('click', function() {
    if (seeds.length > 3) {
      began = true;
    }
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

      switch(true) {
        case (numSeeds == 4):
          bracketNumber(4);
          break;
        case (numSeeds > 4 && numSeeds <=8):
          bracketNumber(8);
          break;
        case (numSeeds > 8 && numSeeds <= 16):
          bracketNumber(16);
          $('body').scrollTop(450);
      } 

    }

    for (var seed in seeds) {
      var index = parseInt(seed) + 1;
      var team = $('.team' + index);

      team.html(seeds[seed])
      teamSize(seeds[seed].length, team);
      team.effect("highlight", {}, 750);
    }

    for (var j = 1; j < 17; j++) {
      var team = $('.team' + j);
      var otherTeam = $('.team' + (j - 1)).html();

      if (team.html() === "(bye)") {
        var matchup = team.parent().parent().attr('class').substring(9);
        $('.w' + matchup).html(otherTeam);
        teamSize(otherTeam.length, $('.w' + matchup));
      }
    }

  });

  fillWinners = function(winner, loser, matchup) {
    if (size == 4) {
      if (matchup == 3) {
        $('#winners').show();
        winPlace(winner, loser);
      } else if (matchup == 4) {
        $('#winners-third').html('Third Place:<p id="p-third"> ' + winner + '</p>');
      }
    } else if (size == 8) {
      if (matchup == 7) {
        $('#winners').show();
        winPlace(winner, loser);
      } else if (matchup == 8) {
        $('#winners-third').html('Third Place:<p id="p-third"> ' + winner + '</p>');
      }
    } else if (size == 16) {
      if (matchup == 15) {
        $('#winners').show();
        winPlace(winner, loser);
      } else if (matchup == 16) {
        $('#winners-third').html('Third Place:<p id="p-third"> ' + winner + '</p>');
      }
    }
  }

  winPlace = function(winner, loser) {
    $('#winners-first').html('First Place:<p id="p-first"> ' + winner + '</p>');
    $('#winners-second').html('Second Place:<p id="p-second"> ' + loser + '</p>');
  }

  $('#tournament').on('click', '.team', function() {
    var winner = $.trim($(this).text());
    var loser = $(this).siblings().text();
    var matchup = $(this).parent().attr('class').substring(9);
    $('.w' + matchup).html(winner).effect("highlight", {}, 750);
    teamSize(winner.length, $('.w' + matchup));

    $('.l' + matchup).html(loser).effect("highlight", {}, 750);
    teamSize(winner.length, $('.l' + matchup));

    fillWinners(winner, loser, matchup);
  })
});
