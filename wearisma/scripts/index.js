var React = require('react'),
    ReactDOM = require('react-dom'),
    moment = require('moment'),
    data = require('./data.js'),
    inputs = require('./inputs.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      walkers: data.walkers,
      date: null,
      time: null,
      postCode: '',
      coords: data.centre,
      dateRange: new Array()
    }
  },

  /* Before the app mounts, generate an Array
  *  of dates between now and a fortnight away
  *  for the user to choose from. */
  componentWillMount: function(){
    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf())
      dat.setDate(dat.getDate() + days);
      return dat;
    }

    function getDates(startDate, stopDate) {
       var dateArray = new Array();
       var currentDate = startDate;
       while (currentDate <= stopDate) {
         dateArray.push(currentDate)
         currentDate = currentDate.addDays(1);
       }
       return dateArray;
     }

     var dateArray = getDates(new Date(), (new Date()).addDays(14));
     this.setState({dateRange: dateArray});
  },

  /* Filter the immutable dummy walkers object
  *  by whichever inputs are populated, and update
  *  the mutable this.state.walkers object. */
  filterWalkers: function() {
    var time = this.state.time;
    var date = this.state.date;
    var newWalkers = new Array();

    if (time === null && date === null){
      var newWalkers = data.walkers;
    }

    /* Check just time */
    else if (time !== null && date === null){
      var newWalkers = _.filter(data.walkers, function(obj){
        return obj.available.includes(time) === true;
      });
    }

    /* Check just date */
    else if (date !== null && time === null){
      var newWalkers = _.filter(data.walkers, function(obj){
        return obj.dates.includes(date) === true;
      });
    }

    /* Check time and date */
    else if (date !== null && time !== null){
      var newWalkers = _.filter(data.walkers, function(obj){
        var dateQ = obj.dates.includes(date) === true;
        var timeQ = obj.available.includes(time) === true;
        if (dateQ && timeQ){ return true }
        else { return false }
      });
    }

    else { console.error("Couldn't read filters"); }

    if (data.compareWalkerArrays(this.state.walkers, newWalkers) === false){
      this.setState({ walkers: newWalkers });
    }
  },

  updatePostCode: function(event){
    this.setState({postCode: event.target.value});
  },

  /* Do a call to the postcodes API to turn the
  *  postcode into a set of coords, then a google
  *  coords object, then setState of the coords to
  *  that. With more time, I wouldn't include jQ
  *  just to do this. */
  parsePostCode: function(event){
    event.preventDefault();
    var apiURL = 'https://api.postcodes.io/postcodes/';
    var getURL = apiURL + this.state.postCode;
    $.get(getURL, function (r) {
      console.log(r);
      var newCoords = new Object();
      newCoords.lat = r.result.latitude;
      newCoords.lng = r.result.longitude;
      this.setState({
        coords: newCoords
      });
    }.bind(this));
  },

  updateTime: function(event){
    if (event.target.value === 'none'){
      this.setState({ time: null });
    } else {
      this.setState({ time: event.target.value });
    }
  },

  /* Turning date objects into strings to snip
  *  off anything more accurate than the day, so
  *  that when we compare dates - ones during the
  *  same day match */
  updateDate: function(event){
    var dateString = new Date(event.target.value).toDateString();
    if (event.target.value === 'none'){
      this.setState({date: null});
    } else {
      this.setState({date: dateString});
    }
  },

  /* Fire off the big filter method after the
  *  component receives new state but before it
  *  renders. */
  componentDidUpdate(){
    this.filterWalkers();
  },

  render: function() {
    return <div className='app'>
      <InputPanel
        updateTime={this.updateTime}
        date={this.state.date}
        range={this.state.dateRange}
        updateDate={this.updateDate}
        updatePostCode={this.updatePostCode}
        postCode={this.state.postCode}
        parsePostCode={this.parsePostCode}
      />
    <OutputPanel walkers={this.state.walkers} centre={this.state.coords} />
    </div>
  }
});

var InputPanel = React.createClass({
  render: function() {
    return <div className='input-panel'>
      <h1 className="input-header">I'm looking for a dog walker...</h1>
      <inputs.PostcodeSelector updatePostCode={this.props.updatePostCode} postCode={this.props.postCode} parsePostCode={this.props.parsePostCode} />

      <inputs.DatePicker date={this.props.date} range={this.props.range} updateDate={this.props.updateDate} />

      <inputs.TimeSelector updateTime={this.props.updateTime} />
    </div>
  }
});


var OutputPanel = React.createClass({
  makeMap: function(){
    data.map = new google.maps.Map(document.getElementById('map'), { center: this.props.centre,
      zoom: 15 });
  },

  /* Grab the coords and set the map to centre on
  *  them. */
  moveMap: function(){
    var latLng = new google.maps.LatLng(this.props.centre.lat, this.props.centre.lng);
    data.map.setCenter(latLng);
  },

  /* Wipe out the data.markers array to clear out
  *  the map, before redrawing the ones that match. */
  clearMarkers: function () {
    for (var i = 0; i < data.markers.length; i++) {
      data.markers[i].setMap(null);
    } data.markers = new Array();
  },

  /* Render the state.walkers and loop through them
  *  again to render and attach the info windows */
  renderMarkers: function(walkers) {
    /* Loop through the walkers data and create a
    *  marker and infoWindow for each */
    for (var i in walkers) {
      /* Create the markers */
      data.markers[i] = new google.maps.Marker({
        id: walkers[i].id,
        position: walkers[i].position,
        map: data.map,
        title: walkers[i].name,
      });

      function walkerBio(walker){
        var avatar = "<img src='" + walker.avatar + "' class='info-window__avatar'/>";
        var name = "<h4 class='info-window__name'>" + walker.name + "</h4>";
        var bio = "<p class='info-window__bio'>" + walker.bio + "</p>";

        return avatar + name + bio;
      }

      /* Create the infoWindow */
      data.infoWindows[i] = new google.maps.InfoWindow({
        content: walkerBio(data.walkers[i])
      });

      /* Add a listener to the marker that opens the
      *  corresponding infoWindow on the marker when
      *  it's clicked. */
      data.markers[i].addListener('click', function() {
        /* Run through and shut all other infoWindows */
        for (var i in data.walkers){
          data.infoWindows[i].close(); }

        /* Grab the key of the marker that's been hit,
        *  find the object that matches in the data, and
        *  open the infoWindow that matches */
        var key = this.id;
        data.infoWindows[key].open(data.map, data.markers[key]);
      });
    }
  },

  componentDidMount: function () {
    this.makeMap();
    this.moveMap();
    this.renderMarkers(this.props.walkers);
  },

  componentWillUpdate: function() {
    this.clearMarkers();
  },

  componentDidUpdate: function() {
    this.moveMap();
    this.renderMarkers(this.props.walkers);
  },

  render: function() {
    return <div id='map' className='output-panel'></div>
  }
});

/* Render the App component to the DOM */
ReactDOM.render(<App />, document.getElementById('app-wrapper'));
