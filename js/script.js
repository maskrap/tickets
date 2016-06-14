function Ticket(movie, time, age){
  this.movie = movie;
  this.time = time;
  this.age = age;
  this.price = 10.00;

}

Ticket.prototype.calc = function(movie){
  var hours = movie.time.split(":")
  var discount = 0;
  if(!movie.firstRelease){
    if(this.age <= 12){
      discount += .5;
    } else if(this.age > 59 ) {
      discount += .25;
    } else {
      discount = 0;
    }

    if(matinee(parseInt(hours[0]))){
      discount += .05;
    }
  }
  if(discount > 0){
    return this.price - (this.price * discount);
  } else {
    return this.price;
  }
}


function Movie(id, name, firstRelease, showings){
  this.id = id;
  this.name = name;
  this.firstRelease = firstRelease;
  this.showings = showings;
}

var matinee = function(hours){
  return (hours < 17) ? true : false;
}

var renderTimes = function(movie){
  var result = "";
  var i = 0;
  movie.showings.forEach(function(showing){
    result += '<button class="btn btn-primary btn-time ' + movie.name.replace(/[^a-z0-9]/ig, "") + '" id="' + movie.id + i + '">' + showing + '</button>';
    i++
  });
  return result;
}

var starWars = new Movie("sw", "Star Wars", false, ["12:30", "18:35", "20:45"]);
var moana = new Movie("mo", "Moana", true, ["12:45", "17:35", "19:25"]);
var whiskeyTango = new Movie("wt", "Whiskey Tango Foxtrot", true, ["12:45", "18:35", "19:00"])

var movArr = [starWars, moana, whiskeyTango]
var selectedMovie = Object;
var mvTimeIndex = 0;

$(function(){
  movArr.forEach(function(movie){
    $('.movielist').append('<li>' + renderTimes(movie)  + " " + movie.name + "</li>");
  });

  $('button.btn-time').click(function(event){
    var btnId = event.target.id;
    var mvId = btnId.charAt(0) + btnId.charAt(1);
    mvTimeIndex = parseInt(btnId.charAt(2));

      for(i = 0; i < movArr.length; i++)  {
        if(movArr[i].id === mvId) {
          selectedMovie = movArr[i];
          i = movArr.length;
        }
      };
    //debugger;
    $('h2#movie-title').text(selectedMovie.name + " " + selectedMovie.showings[mvTimeIndex]);
    $('#myModal').modal().toggle();

  });

  $('#ticket-display').submit(function(event){
    event.preventDefault();
    var tixAge = $('#age').val();
    var tix = new Ticket(selectedMovie.name, selectedMovie.showings[mvTimeIndex], tixAge);
    var ticketCost = tix.calc(tix);
    $('#totals').text("");
    $('#totals').append("<h2>$" + ticketCost.toFixed(2)  + "</h2>");

  })

});
