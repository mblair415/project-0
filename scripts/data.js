$(document).ready(function() {
  console.log("data.js loads")

  var player = {
    name : "Frodo",  // eventually a field the player can enter a name into
    level : 1, // a function?  not sure yet.  not sure how i want to handle xp yet.
    xp : 0,
    hp : 10,  // eventually an equation.   combination of gear bonuses and level with a modifier for class.
    dmg : [0, 1, 2],
    gear : {
      head : {},
      arms : {},
      chest : {},
      hands : {},
      legs : {name : "pants of modesty", hp : 0, dmg : 0},
      feet : {}
    }
  }

  var mobs = {
    difficulty1 : [
      {
        name : "small, malnourished, infant rat",
        image : "http://img.photobucket.com/albums/v661/Pandara1/IRL%20Pets/sideview.jpg",
        lvl : 1,
        xp : 1,
        hp : 5,
        dmg : [0, 1, 1],
        loot : "none"
      },
  //     {
  //       name : "sleeping infant rat",
  //       image : ,
  //       lvl : 1,
  //       xp :
  //     }
    ]
  }

})
