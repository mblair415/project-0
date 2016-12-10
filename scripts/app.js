$(document).ready(function() {
  console.log("app.js loads")

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
    }
  ]
}

  function damage([base, low, high]){
    return (Math.floor(Math.random() * (high-low + 1) + low)) + base;
  }

  $(".btn").on("click", function() {
    // console.log("test test button test")
    var fightMob = mobs.difficulty1[0] // eventually decide difficulty level
    fight(player, fightMob);
  })

  function fight(player, fightMob){
    $('#enemy').html('')
    $("#enemy").append('<img id="'+fightMob.image+'" src="'+fightMob.image+'"/>');
    $('#enemy').fadeIn(1000).fadeOut(500).fadeIn(500);
    combat(player, fightMob);
    // unfinished
  }

  function combat(player, fightMob){
    var tempMobHp = fightMob.hp;
    // console.log("combat has started")
    roundOfCombat(player,fightMob);

    function roundOfCombat(player, fightMob, currentMobHp){  // this portion will loop until player or mob is dead
      console.log("a round of combat has started")
      var playerSwing = damage(player.dmg);
      console.log("round start player dmg " + playerSwing + " mob hp " + tempMobHp);
      if (tempMobHp - playerSwing < 1) {
        // console.log("player win is about to trigger")
        playerWin(player, fightMob, playerSwing);  // does not exist yet.  exp, level check, loot
      } else {
        var mobSwing = damage(fightMob.dmg);
        tempMobHp -= playerSwing;
        if (player.hp - damage(fightMob.dmg) < 1) {
          playerDeath(fightMob); // does not exist yet.  say something on the screen. modal?
        } else {
          player.hp -= mobSwing;
          roundOfCombat(player, fightMob, tempMobHp); // recursive loop
        }
      }
    }
  }

  function playerWin(player, fightMob, playerSwing){
    console.log("You killed a " + fightMob.name + " with a swing for " +
    playerSwing + " damage!"); // need a modal or something.
    // need something for loot.
    player.xp += fightMob.xp;
    if (player.xp > 5) { // need to turn this into something more impressive.
      player.lvl += 1; // player needs to be told.
      console.log("You gained a level! You're now level " + player.lvl);
    }
  }

  function playerDeath(fightMob) { // need a modal or something.
    console.log("you died, dude.")
  }

})
