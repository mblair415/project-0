// $(document).ready(function() {
//   console.log("app.js loads")

  function damage(base, low, high){
    return (Math.floor(Math.random() * (high-low + 1) + low)) + base;
  }

  $(".btn").on("click", function() {
    var fightMob = data.mob.difficulty1[0] // eventually decide difficulty level
    fight(data.player, fightMob);
  })

  function fight(player, fightMob){
    $("#enemy").append("<img id="fightMob.image" src="fightMob.image"/>");
    combat(player, fightMob);
    // unfinished
  }

  function combat(player, fightMob){
    var tempMobHp = fightMob.hp;

    function roundOfCombat(player, fightMob){  // this portion will loop until player or mob is dead
      var playerSwing = damage(player.dmg);
      if (tempMobHp - playerSwing < 1) {
        playerWin(player, fightMob, playerSwing);  // does not exist yet.  exp, level check, loot
      } else {
        var mobSwing = damage(fightMob.dmg);
        tempMobHp -= playerSwing;
        if (player.hp - damage(fightMob.dmg) < 1) {
          playerDeath(fightMob); // does not exist yet.  say something on the screen. modal?
        } else {
          player.hp -= mobSwing;
          rountOfCombat(player, fightMob); // recursive loop
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
    
  }

// })
