$(document).ready(function() {
  console.log('app.js loads')


var player = {
  name : 'Frodo',  // eventually a field the player can enter a name into
  lvl : 1, // a function?  not sure yet.  not sure how i want to handle xp yet.
  xp : 0,
  hp : 5,  // eventually an equation.   combination of gear bonuses and level with a modifier for class.
  dmg : [0, 1, 4],
  gear : {
    head : {},
    arms : {},
    chest : {},
    hands : {},
    legs : {},
    feet : {},
  }
}

var lootTable = [[ // main array, which nested arrays that correstpond to value
  {
    slot : 'feet',
    name : 'gore covered strips of fur',
    hp : 2,
    dmg : 1,
    rating : 2
  },
  {
    slot : 'head',
    name : 'smelly burlap sack with holes in it',
    hp : 1,
    dmg : 0,
    rating : 1
  },
  {
    slot : 'arms',
    name : 'a selfmade friendship bracelet',
    hp : 0,
    dmg : 0,
    rating : 0
  },
  {
    slot : 'chest',
    name : 'bubblewrap',
    hp : 0,
    dmg : 0,
    rating : 0
  },
  {
    slot : 'legs',
    name : 'pants of modesty',
    hp : 0,
    dmg : 0,
    rating : 0
  },
  {
    slot : 'hands',
    name : 'caked on dirt',
    hp : 0,
    dmg : 0,
    rating : 0
  }
],
[
  {
    slot : 'hands',
    name : 'heavy leather gauntlets',
    hp : 1,
    dmg : 1,
    rating : 1
  },
  {
    slot : 'feet',
    name : 'soft leather moccasins',
    hp : 4,
    dmg : 0,
    rating : 2
  },
  {
    slot : 'chest',
    name : 'brass breastplate',
    hp : 5,
    dmg : 1,
    rating : 3
  },
  {
    slot : 'arms',
    name : 'bone and talon bracers',
    hp : 1,
    dmg : 2,
    rating : 2
  },
  {
    slot : 'head',
    name : 'fur lined helm',
    hp : 3,
    dmg : 0
  },
  {
    slot : 'legs',
    name : 'bone and fur greaves',
    hp : 3,
    dmg : 3,
    rating : 3
  }

]]

var mobs = [
    {
      name : 'small, malnourished, infant rat',
      image : 'http://img.photobucket.com/albums/v661/Pandara1/IRL%20Pets/sideview.jpg',
      lvl : 1,
      xp : 1,
      hp : 2,
      dmg : [0, 1, 1],
      loot : whichLoot(0)
    },
    {
      name : 'sleeping infant rat',
      image : 'http://cdn.rentokil.com/content/global/images/desktop/main_black-rat-rev.jpg',
      lvl : 1,
      xp : 1,
      hp : 5,
      dmg : [0, 0, 2],
      loot : whichLoot(0)
    },
    {
      name : 'old, nearly toothless, feeble rat',
      image : 'http://pics.livejournal.com/helsic_fangirl/pic/00013h76/s320x240',
      lvl : 2,
      xp : 2,
      hp : 8,
      dmg : [0, 2, 3],
      loot : whichLoot(1)
    }
]

updateStats(player);

  function damage([base, low, high]){
    return (Math.floor(Math.random() * (high-low + 1) + low)) + base;
  }

  $(".btn").on("click", function() {
    // console.log("test test button test")
    var fightMob = mobs[0] // eventually decide difficulty level system
    console.log(fightMob.loot)
    fight(player, fightMob);
  })

  function whichLoot(num){
    return lootTable[num][(Math.floor(Math.random() * 6))];
  }
  console.log(whichLoot(1));
  console.log(whichLoot(0));

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
    $(".player-status-combat").prepend('<pre>You found a ' + fightMob.name + '!</pre>');
    roundOfCombat(player,fightMob, tempMobHp);

    function roundOfCombat(player, fightMob, currentMobHp){  // this portion will loop until player or mob is dead
      console.log("a round of combat has started.  mob has " + tempMobHp)
      var playerSwing = damage(player.dmg);
      console.log("round start player dmg " + playerSwing + " mob hp " + tempMobHp);
      if (tempMobHp - playerSwing < 1) {
        playerWin(player, fightMob, playerSwing);
        $(".player-status-combat").prepend('<pre>You murdered it with a vicious swing for ' + playerSwing + '!</pre>');
      } else {
        var mobSwing = damage(fightMob.dmg);
        currentMobHp -= playerSwing;
        $(".player-status-combat").prepend('<pre>You hit for ' + playerSwing + '!</pre>');
        if (player.hp - mobSwing < 1) {
          player.hp = 0;
          playerDeath(player, fightMob, mobSwing);
        } else {
          player.hp -= mobSwing;
          console.log("mob hits for " + mobSwing + " your current health " + player.hp)
          $(".player-status-combat").prepend('<pre>You were hit for ' + mobSwing + '!  You were reduced to ' + player.hp + ' health.</pre>');
          updateStats(player);
          roundOfCombat(player, fightMob, tempMobHp); // recursive loop
        }
      }
    }
  }

  function playerWin(player, fightMob, playerSwing){  // if you win, check for gaining things and update screen
    console.log("You killed a " + fightMob.name + " with a swing for " +
    playerSwing + " damage!"); // need a modal or something.
    player.xp += fightMob.xp;
    updateGear(player, fightMob);
    updateStats(player);
    console.log(player.lvl + ' is player level.  and player xp is ' + player.xp)
    if (player.xp > 5 && player.lvl === 1) { // need to turn this into something more impressive.
      player.lvl += 1; // player needs to be told.
      player.hp = player.lvl * 5;
      updateStats(player);
      console.log("You gained a level! You're now level " + player.lvl);
    } else if (player.xp > 15 && player.lvl === 2) {
      player.lvl += 1;
      player.hp = player.lvl * 5;
      updateStats(player);
    }
  }

  function updateGear(player, fightMob){
    var mobGearRating = fightMob.loot.rating;
    var curSlot = fightMob.loot.slot;

    if (mobGearRating === undefined) {
      return;
    } else {
      if (mobGearRating <= player.gear[curSlot].rating){
        return;
      } else {
        player.gear[curSlot] = fightMob.loot;
        player.hp += player.gear[curSlot].hp;
        player.dmg[0] += player.gear[curSlot].dmg;
        updateStats(player); // currently redundant.  playerWin updates gear then updates stats.  keeping for now, not sure how else i may call this in the future.
        $('#player-gear-' + curSlot).html('');
        $('#player-gear-' + curSlot).append('<p>' + player.gear[curSlot].name +
        '</p>');
        $(".player-status-event").prepend('<pre>You found ' + fightMob.loot.name + '!</pre>');
      }
    }
  }

  /*
i want this to update the status window based on what is happening in game.

  */

  // function playerGainLevel(player, fightMob) {  // beyond current scope
  //   player.xp += fightMob.xp;
  //   updateStats(player);
  //   if (player.xp >= 5+(player.lvl*1.15)
  // }

  function playerDeath(player, fightMob, mobSwing) { // need a modal or something.
    console.log("you died, dude.")
    $(".player-status-combat").prepend('<pre>You were hit for ' + mobSwing + ' and you succum to the damage.  You have died from your wounds.</pre>');
    $(".player-status-combat").prepend('<pre>You got all the way to level ' + player.lvl + ' way to go!</pre>');
  }

})
