var data = new Object();

/* Declaring these here under the global data object
*  so that I can reference them across different methods
*  and components. */
data.markers = new Array();
data.infoWindows = new Object();
data.map = new Object();

/* Filling in the dummy data with random dates between
*  now and a fortnight away. */
data.randomDatesArray = function() {
  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  var fromNow = new Array();
  var dates = new Array();
  for (i = 0; i <= 10; i++) {
    fromNow[i] = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
  }
  for (i = 0; i <= 10; i++) {
    var dateObject = new Date().addDays(fromNow[i]);
    dates[i] = dateObject.toDateString();
  }
  return dates;
}

/* Pull the IDs out of the walkers collections and into
*  new arrays, compare the IDs to discern whether the
*  new and old walkers match. */
data.compareWalkerArrays = function(oldArr, newArr){
  var oldKeys = oldArr.map(function(obj){ return obj.id; }).sort();
  var newKeys = newArr.map(function(obj){ return obj.id; }).sort();
  var matchingArrays;
  for (i=0;i<oldArr.length;i++){
    matchingArrays = oldArr[i] === newArr[i];
  }
  return matchingArrays;
}

data.walkers = [
  {
    id: 0,
    name: "Robert Paulson",
    position: {lat: 51.53, lng: -0.08},
    available: ["05:00", "16:00", "21:00", "18:00", "06:00", "08:00"],
    dates: data.randomDatesArray(),
    avatar: "http://lorempixel.com/200/200/people/1",
    bio: "My name is Robert Paulson. My name is Robert Paulson.",
  },
  {
    id: 1,
    name: "Marcellus Wallace",
    position: {lat: 51.52, lng: -0.07},
    dates: data.randomDatesArray(),
    available: ["15:00", "07:00", "14:00", "17:00"],
    avatar: "http://lorempixel.com/200/200/people/2",
    bio: "Likes milkshakes, doing the twist, and organised crime."
  },
  {
    id: 2,
    name: "Dick Grayson",
    position: {lat: 51.52, lng: -0.08},
    dates: data.randomDatesArray(),
    available: ["16:00", "21:00", "18:00", "13:00", "10:00"],
    avatar: "http://lorempixel.com/200/200/people/3",
    bio: "I have a super interesting day job that I can't tell you about."
  },
  {
    id: 3,
    name: "Eduardo Saverin",
    position: {lat: 51.51, lng: -0.087},
    dates: data.randomDatesArray(),
    available: ["21:00", "18:00", "13:00", "10:00", "12:00"],
    avatar: "http://lorempixel.com/200/200/people/4",
    bio: "Seasoned entrepreneur looking for new ventures. Hates Jesse Eiseinburg."
  },
  {
    id: 4,
    name: "Joe Pesci",
    position: {lat: 51.53, lng: -0.08},
    dates: data.randomDatesArray(),
    available: ["09:00", "21:00", "07:00", "10:00"],
    avatar: "http://lorempixel.com/200/200/people/5",
    bio: "Why you lookin at me like that?"
  },
  {
    id: 5,
    name: "Tony Danza",
    position: {lat: 51.523, lng: -0.085},
    dates: data.randomDatesArray(),
    available: ["13:00", "14:00", "15:00", "16:00"],
    avatar: "http://lorempixel.com/200/200/people/6",
    bio: "I was famous once."
  },
  {
    id: 6,
    name: "James Cameron",
    position: {lat: 51.529, lng: -0.079},
    dates: data.randomDatesArray(),
    available: ["17:00", "18:00", "19:00", "20:00"],
    avatar: "http://lorempixel.com/200/200/people/7",
    bio: "My favourite colour is blue, and I like shiny, gold statues."
  },
  {
    id: 7,
    name: "John Quincy",
    position: {lat: 51.528, lng: -0.09},
    dates: data.randomDatesArray(),
    available: ["21:00", "22:00", "05:00", "06:00"],
    avatar: "http://lorempixel.com/200/200/people/8",
    bio: "I fought the law, and won because I wrote it."
  },
  {
    id: 8,
    name: "George Washington",
    position: {lat: 51.525, lng: -0.085},
    dates: data.randomDatesArray(),
    available: ["07:00", "08:00", "09:00", "10:00"],
    avatar: "http://lorempixel.com/200/200/people/9",
    bio: "My hometown is George Washingtown D.C."
  },
  {
    id: 9,
    name: "Thomas Jefferson",
    position: {lat: 51.523, lng: -0.079},
    dates: data.randomDatesArray(),
    available: ["11:00", "12:00", "13:00", "14:00"],
    avatar: "http://lorempixel.com/200/200/people/10",
    bio: "Did I invent the lightbulb or was that the other guy?"
  },
  {
    id: 10,
    name: "Margaret Thatcher",
    position: {lat: 51.528, lng: -0.09},
    dates: data.randomDatesArray(),
    available: ["15:00", "16:00", "17:00", "18:00"],
    avatar: "http://lorempixel.com/200/200/people/11",
    bio: "#controversial"
  },
  {
    id: 11,
    name: "Catherine Parr",
    position: {lat: 51.529, lng: -0.09},
    dates: data.randomDatesArray(),
    available: ["19:00", "20:00", "21:00", "22:00"],
    avatar: "http://lorempixel.com/200/200/people/12",
    bio: "Used to taking care of old dogs."
  }
];

/* A default centre for the map */
data.centre = {lat: 51.52, lng: -0.08};

module.exports = data;
