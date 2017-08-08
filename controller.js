function Controller() {
  var service = new Service();

  function draw(arr) {
    var template = ''

    for (var i = 0; i < arr.length; i++) {
      var player = arr[i];
      if(player.jersey == undefined){
        player.jersey = 'N/A';
      }
      template +=
        `
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 ${player.id}">
        <div class="box">
          <h3>${player.fullname}</h3>
            <div> 
              <img class="img-responsive char-icon center-block" 
              src=${player.photo} alt=${player.fullname}>
              <div>Position: ${player.position}</div>
              <div>Team: ${player.pro_team}</div>
              <div>Jersey: ${player.jersey}</div>
              <div>
                <button class="btn btn-default" onclick="app.controllers.controller.addPlayer(${player.id})">Add</button>
              </div>
          </div>
        </div>
      </div>
      `
    }
    document.getElementById('search-results').innerHTML = template;
  }
  drawRoster = function () {
    var roster = service.getRoster()
    var template = ''

    roster.forEach(player => {
      template +=
        `
      <div class="box ${player.id}">
      <img class="img-responsive char-icon center-block" src=${player.photo} alt=${player.fullname}>
        <h3>${player.fullname}</h3>
        <div>
          <button class="btn" onclick="app.controllers.controller.removePlayer(${player.id})">Remove</button>
        </div>
      </div>
      `
    })

    document.getElementById('my-roster').innerHTML = template;

  }

  this.filterData = function (event) {
    event.preventDefault();
    var searchObj = {
      name: event.target.name.value,
      team: event.target.team.value,
      positions: event.target.positions.value
    }

    service.filterData(searchObj, draw);
  }

  this.addPlayer = function (id) {
    $("div").remove("." + id)
    service.addPlayer(id)
    drawRoster()

  }
  this.removePlayer = function (id) {
    service.removePlayer(id)
    drawRoster()
  }

  //service.filterData(draw)
}
