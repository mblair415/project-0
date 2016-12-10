$(document).ready(function() {
  console.log('app.js loads')


var player = {
  name : 'Frodo',  // eventually a field the player can enter a name into
  lvl : 1, // a function?  not sure yet.  not sure how i want to handle xp yet.
  xp : 0,
  hp : 10,  // eventually an equation.   combination of gear bonuses and level with a modifier for class.
  dmg : [0, 1, 4],
  gear : {
    head : {},
    arms : {},
    chest : {},
    hands : {},
    legs : {
      name : 'pants of modesty',
      hp : 0,
      dmg : 0,
      rating : 0
    },
    feet : {}
  }
}

var mobs = {
  difficulty1 : [
    {
      name : 'small, malnourished, infant rat',
      image : 'http://img.photobucket.com/albums/v661/Pandara1/IRL%20Pets/sideview.jpg',
      lvl : 1,
      xp : 1,
      hp : 2,
      dmg : [0, 1, 1],
      loot : {}
    },
    {
      name : 'sleeping infant rat',
      image : 'https://media.mnn.com/assets/images/2015/06/rat-sleeping.jpg',
      lvl : 1,
      xp : 1,
      hp : 5,
      dmg : [0, 0, 2],
      loot : {
        slot : 'head',
        name : 'dirty burlap sack with holes in it',
        hp : 1,
        dmg : 0,
        rating : 1
        }
      },
      {
        name : 'old, nearly toothless, feeble rat',
        image : 'http://pics.livejournal.com/helsic_fangirl/pic/00013h76/s320x240',
        lvl : 2,
        xp : 2,
        hp : 8,
        dmg : [0, 2, 3],
        loot : {
          slot : 'feet',
          name : 'gore covered strips of fur',
          hp : 2,
          dmg : 1,
          rating : 2
        }
      }
    ]
}
updateStats(player);

  function damage([base, low, high]){
    return (Math.floor(Math.random() * (high-low + 1) + low)) + base;
  }

  $(".btn").on("click", function() {
    // console.log("test test button test")
    var fightMob = mobs.difficulty1[1] // eventually decide difficulty level system
    fight(player, fightMob);
  })

  function updateStats(player){
    $("#player-level").html('');
    $("#player-level").append('<p>' + player.lvl + '</p>');
    $("#player-hp").html('');
    $("#player-hp").append('<p>' + player.hp + '</p>');
    $("#player-xp").html('');
    $("#player-xp").append('<p>' + player.xp + '</p>');
    $("#player-dmg").html('');
    $("#player-dmg").append('<p>Range: '+ (player.dmg[0] + player.dmg[1]) +
    ' - ' + (player.dmg[0] + player.dmg[2]) + '</p>');
  }

  function updateGear(player, fightMob){
    var mobRating = fightMob.loot.rating;
    var curSlot = fightMob.loot.slot;

    if (mobRating === undefined) {
      return;
    } else {
      if (mobRating < player.gear[curSlot].rating){
        return;
      } else {
        player.gear[curSlot] = fightMob.loot;
        $('#player-gear-' + curSlot).html('');
        $('#player-gear-' + curSlot).append('<p>' + player.gear[curSlot].name + '</p>');
      }
    }
  }

  // function updateGear2(player, gear){  // beyond current scope
  //   $("#player-gear-head").html('');
  //   $("#player-gear-head").append('<p>' + player.lvl + '</p>')
  // }

  function fight(player, fightMob){  // flash image and trigger combat function
    $('#enemy').html('');
    $('#enemy').append('<img id="'+fightMob.image+'" src="'+fightMob.image+'"/>');
    $('#enemy').fadeIn(500).fadeOut(500).fadeIn(500);
    combat(player, fightMob);
    // unfinished
  }

  function combat(player, fightMob){ // set up temp hp for mob.  recursive loot for combat
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
          updateStats(player);
          roundOfCombat(player, fightMob, tempMobHp); // recursive loop
        }
      }
    }
  }

  function playerWin(player, fightMob, playerSwing){  // if you win, check for gaining things and update screen
    console.log("You killed a " + fightMob.name + " with a swing for " +
    playerSwing + " damage!"); // need a modal or something.
    // need something for loot.
    player.xp += fightMob.xp;
    updateGear(player, fightMob);
    updateStats(player);
    console.log(player.lvl + ' is player level.  and player xp is ' + player.xp)
    if (player.xp > 5 && player.lvl === 1) { // need to turn this into something more impressive.
      player.lvl += 1; // player needs to be told.
      updateStats(player);
      console.log("You gained a level! You're now level " + player.lvl);
    } else if (player.xp > 15 && player.lvl === 2) {
      player.lvl += 1;
      updateStats(player);
    }
  }

  // function playerGainLevel(player, fightMob) {  // beyond current scope
  //   player.xp += fightMob.xp;
  //   updateStats(player);
  //   if (player.xp >= 5+(player.lvl*1.15)
  // }

  function playerDeath(fightMob) { // need a modal or something.
    console.log("you died, dude.")
  }

})
