var Service = function (endpointUri, callback) {
  var playersData = [];
  var getData = [];
  var myRoster = localStorage.getItem('myRoster')|| [];;
  var filteredPlayers = [];

  function loadPlayersData() {

    var localData = localStorage.getItem('playersData');
    if (localData) {
      playersData = JSON.parse(localData);
      return //callback(); 
      //return will short-circuit the loadPlayersData function
      //this will prevent the code below from ever executing
    }

    var url = "http://bcw-getter.herokuapp.com/?url=";
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(endpointUri);

    $.getJSON(apiUrl, function (data) {
      playersData = data.body.players;
      console.log('Player Data Ready')
      console.log('Writing Player Data to localStorage')
      localStorage.setItem('playersData', JSON.stringify(playersData))
      console.log('Finished Writing Player Data to localStorage')
      // callback()
    });
  }
  //Add to roster
  this.addPlayer = function (id) {
    if (myRoster.length < 25) {
      var player = playersData.find(player => player.id == id)
      if (myRoster.indexOf(player) == -1) {
        myRoster.push(player)
      }
    } localStorage.setItem('myRoster', JSON.stringify(myRoster))
  }

  //Remove from roster
  this.removePlayer = function (id) {
    var player = playersData.find(player => player.id == id);
    var num = myRoster.indexOf(player);
    if (num != -1) {
      myRoster.splice(num, 1);
    }
  }
  //Return Array to controller
  this.filterData = function (obj, cb) {
    filteredPlayers = [];
    //get data from local storage
    getData = localStorage.getItem('playersData');
    getData = JSON.parse(getData);
    //filter by name
    if (obj.name != "") {
      getData.forEach(function (player) {
        if (player.fullname == obj.name) {
          filteredPlayers.push(player);
        }
      })
    } else if (obj.name == "" && obj.team == "all" && obj.positions == "all") {
      return;
    } if (obj.team != "all") {
      getData.forEach(function (player) {
        if (player.pro_team == obj.team) {
          filteredPlayers.push(player);
        }
      })
    } if (obj.positions != "all") {
      getData.forEach(function (player) {
        if (player.position == obj.positions) {
          filteredPlayers.push(player);
        }
      })
    }

    //filter the data
    console.log(filteredPlayers);
    cb(filteredPlayers);
  }


  //Get roster and send to controller
  this.getRoster = function () {
    return JSON.parse(JSON.stringify(myRoster))
  }
  loadPlayersData(); //call the function above every time we create a new service
} 