$(document).ready(function() {
  var seeds = [];
  var began = false;
  var size = {};
  var losers = [];
  var challengees = [];

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
        alert("Please limit the number of ideas to 16 for a single tournament.");
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
      $('#goal-header').html("Objective: " + goal);
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
      $('#company-header').html("Company: " + company);
    }
  }

  $('#company-button').on('click', function() {
    addCompany();
  })

  $('#goal-button').on('click', function() {
    addGoal();
  })

  $('#goal-field').on('focusin', function() {
    $('#goal-field').val('');
  })

  $('#company-name').on('focusin', function() {
    $('#company-name').val('');
  })

  $('#seed').on('focusin', function() {
    $('#seed').val('');
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
          while (seeds.length < 8) {
            seeds.push("(bye)");
          }
        } else if (numSeeds <= 16 && numSeeds > 4) {
          while (seeds.length < 16) {
            seeds.push("(bye)");
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
      var otherTeamEl = $(team.parent().siblings()[0]).children()[0]
      var otherTeam = $(otherTeamEl).html();

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
        $('#winners-third').html('<p id="p-third">' + winner + '</p>');
      }
    } else if (size == 8) {
      if (matchup == 7) {
        $('#winners').show();
        winPlace(winner, loser);
      } else if (matchup == 8) {
        $('#winners-third').html('<p id="p-third">' + winner + '</p>');
      }
    } else if (size == 16) {
      if (matchup == 15) {
        $('#winners').show();
        winPlace(winner, loser);
      } else if (matchup == 16) {
        $('#winners-third').html('<p id="p-third">' + winner + '</p>');
      }
    }
  }

  winPlace = function(winner, loser) {
    $('#winners-first').html('<p id="p-first">' + winner + '</p>');
    $('#winners-second').html('<p id="p-second">' + loser + '</p>');
  }

  $('#tournament').on('click', '.team', function() {
    var winner = $.trim($(this).text());
    var loser = $.trim($(this).siblings().text());
    var matchup = $(this).parent().attr('class').substring(9);
    $('.w' + matchup).html(winner).effect("highlight", {}, 750);
    teamSize(winner.length, $('.w' + matchup));

    $('.l' + matchup).html(loser).effect("highlight", {}, 750);
    teamSize(winner.length, $('.l' + matchup));

    fillWinners(winner, loser, matchup);
    var winnerIndex = losers.indexOf(winner);
    if (winnerIndex > -1) {
      losers.splice(winnerIndex, 1);
    }
    losers.push(loser);
  });

  $('.bracket').on('click', '.challenge', function() {
    if (size == 8) {
      for (var i = 1; i < 5; i++) {
        challengees.push($('.w' + i));
        $('#challenged').append('<option>' + challengees[i - 1].html() + '</option>');
      }
    } else if (size == 16) {
      for (var i = 9; i < 13; i++) {
        challengees.push($('.w' + i));
        $('#challenged').append('<option>' + challengees[i - 9].html() + '</option>');
      }
    }

    $('#challenge-div').show();
    losers.sort();
    for(var loser in losers) {
      $('#challengers').append('<option>' + losers[loser] + '</option>')
    }
  });

  $('#challenge-ok').on('click', function() {
    for (var i in challengees) {
      if (challengees[i].html() === $('#challenged option:selected').text()) {
        challengees[i].html($('#challengers option:selected').text());
      }
    }

    var loserIndex = losers.indexOf($('#challengers option:selected').text());
    losers.splice(loserIndex, 1);
    losers.push($('#challenged option:selected').text());

    $('#challenge-div').hide();
    $('#challenged').html('');
    $('#challengers').html('');
  });

  $('#challenge-cancel').on('click', function() {
    $('#challenge-div').hide();
    $('#challenged').html('');
    $('#challengers').html('');
  })

  $('#export').on('click', function() {
    $('img').hide();
    $('.nav').hide();
    $('#tournament-controls').hide();
    $('.footer').hide();
    $('#export').hide();
    $('.challenge').hide();
    $('.consolation').hide();
    $('#tournament-details').css({
      "position" : "fixed",
      "top" : "0"
    });
    $('#winners').css({
      "position" : "fixed",
      "left" : "500px"
    })

    if (size == 16) {
      $('#tournament-details').css("top", "-10px");
      $('#winners').css("top", "-10px");
    }
    
    $('#bracket4').css("margin-top", "290px");
    $('#bracket8').css("margin-top", "290px");

    window.print();

    $('img').show();
    $('.nav').show();
    $('#tournament-controls').show();
    $('.footer').show();
    $('#export').show();
    $('.challenge').show();
    $('.consolation').show();
    $('#tournament-details').css({
      "position" : "absolute",
      "top" : "100px"
    });
    $('#winners').css({
      "position" : "absolute",
      "right" : "20px",
      "left" : "auto"
    });

    if (size == 16) {
      $('#tournament-details').css("top", "100px");
      $('#winners').css("top", "0");
    }

    $('#bracket4').css("margin-top", "150px");
    $('#bracket8').css("margin-top", "40px");

  });
});
