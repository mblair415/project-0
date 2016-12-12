$(document).ready(function() {
  console.log('app.js loads')

// second: do the loot check indepent of the creature.  just run the function
// to check for loot once a thing dies.

var player = {
  name : 'Frodo',
  lvl : 1,
  xp : 0,
  hp : 10,
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
    hp : 0,
    dmg : 1,
    rating : 2
  },
  {
    slot : 'head',
    name : 'smelly sack with a hole',
    hp : 1,
    dmg : 0,
    rating : 1
  },
  {
    slot : 'arms',
    name : 'a friendship bracelet',
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
    hp : 2,
    dmg : 1,
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
    dmg : 1,
    rating : 2
  },
  {
    slot : 'head',
    name : 'fur lined helm',
    hp : 3,
    dmg : 0,
    rating : 2
  },
  {
    slot : 'legs',
    name : 'bone and fur greaves',
    hp : 2,
    dmg : 2,
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
      dmg : [0, 0, 1],
      loot : whichLoot(0)
    },
    {
      name : 'infant rat',
      image : 'http://www.cutestpaw.com/wp-content/uploads/2013/12/baby-rat.jpg',
      lvl : 2,
      xp : 2,
      hp : 8,
      dmg : [0, 0, 2],
      loot : whichLoot(0)
    },
    {
      name : 'pacifist rat',
      image : 'https://s-media-cache-ak0.pinimg.com/236x/a0/73/5b/a0735bef5b5beda13af358a19cde6119.jpg',
      lvl : 1,
      xp : 1,
      hp : 6,
      dmg : [0, 0, 1],
      loot : whichLoot(0)
    },
    {
      name : 'crippled mammoth rat',
      image : 'http://crazeyivan.files.wordpress.com/2010/09/fat-rat1.jpg',
      lvl : 1,
      xp : 1,
      hp : 10,
      dmg : [0, 1, 1],
      loot : whichLoot(0)
    },
    {
      name : 'sleeping infant rat',
      image : 'http://cdn.rentokil.com/content/global/images/desktop/main_black-rat-rev.jpg',
      lvl : 1,
      xp : 1,
      hp : 5,
      dmg : [0, 0, 1],
      loot : whichLoot(0)
    },
    {
      name : 'old, nearly toothless, feeble rat',
      image : 'http://pics.livejournal.com/helsic_fangirl/pic/00013h76/s320x240',
      lvl : 2,
      xp : 2,
      hp : 9,
      dmg : [0, 1, 3],
      loot : whichLoot(1)
    },
    {
      name : 'jaws',
      image : 'http://news.bbcimg.co.uk/media/images/50060000/jpg/_50060756_rat.jpg',
      lvl : 2,
      xp : 2,
      hp : 6,
      dmg : [0, 0, 5],
      loot : whichLoot(1)
    },
    {
      name : 'butters',
      image : 'http://2.bp.blogspot.com/-0st69Q6xF_4/UAOEhsHLIQI/AAAAAAAALb8/o8ojhZERPi8/s1600/Funny+Rat_.jpg',
      lvl : 2,
      xp : 2,
      hp : 10,
      dmg : [0, 0, 2],
      loot : whichLoot(1)
    }
]

updateStats(player);

  function damage([base, low, high]){
    return (Math.floor(Math.random() * (high-low + 1) + low)) + base;
  }

  $(".btn").on("click", function() { // add combat sound
    var fightMob = whichMob();
    fight(player, fightMob);
  })

  function whichLoot(num){
    return lootTable[num][(Math.floor(Math.random() * 6))];
  }

  function whichMob(){
    return mobs[(Math.floor(Math.random() * mobs.length))]
  }

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

  function fight(player, fightMob){
    $('#enemy').html('');
    $('#enemy').append('<img id="'+fightMob.image+'" src="'+fightMob.image+'"/>');
    $('#enemy').fadeIn(500).fadeOut(500).fadeIn(500);

    combat(player, fightMob);
  }

  function combat(player, fightMob){ // set up temp hp for mob.  recursive loot for combat
    var tempMobHp = fightMob.hp;
    $(".player-status-combat").prepend('<pre>You found a ' + fightMob.name + '!</pre>');
    roundOfCombat(player,fightMob, tempMobHp);

    function roundOfCombat(player, fightMob, currentMobHp){  // this portion will loop until player or mob is dead
      var playerSwing = damage(player.dmg);
      if (tempMobHp - playerSwing < 1) {
        playerWin(player, fightMob, playerSwing);
        $(".player-status-combat").prepend('<pre>You murdered it with a vicious swing for ' + playerSwing + '!</pre>');
      } else {
        var mobSwing = damage(fightMob.dmg);
        tempMobHp -= playerSwing;
        $(".player-status-combat").prepend('<pre>You hit for ' + playerSwing + '!</pre>');
        if (player.hp - mobSwing < 1) {
          player.hp = 0;
          playerDeath(player, fightMob, mobSwing);
        } else {
          player.hp -= mobSwing;
          $(".player-status-combat").prepend('<pre>You were hit for ' + mobSwing + '!  You were reduced to ' + player.hp + ' health.</pre>');
          updateStats(player);
          roundOfCombat(player, fightMob, tempMobHp); // recursive loop
        }
      }
    }
  }

  function playerWin(player, fightMob, playerSwing){  // if you win, check for gaining things and update screen
    player.xp += fightMob.xp;
    updateGear(player, fightMob);
    updateStats(player);
    if (player.xp > 5 && player.lvl === 1) { // need to turn this into something more impressive.
      player.lvl += 1; // player needs to be told.
      player.hp = player.lvl * 5;
      updateStats(player);
      $(".player-status-event").prepend('<pre>You gained a level and are now level ' + player.lvl + '!</pre>');
    } else if (player.xp > 15 && player.lvl === 2) {
      player.lvl += 1;
      player.hp = player.lvl * 5;
      updateStats(player);
      $(".player-status-event").prepend('<pre>You gained a level and are now level ' + player.lvl + '!</pre>');
    } else if (player.xp > 25 && player.lvl === 3) {
      $(".player-status-event").prepend('<pre>You kicked all the rats!  You win!</pre>');

    }
  }

  function updateGear(player, fightMob){ // checks to see if new gear is better than current, updates stats and equips on screen
    var mobGearRating = fightMob.loot.rating;
    var mobGearName = fightMob.loot.name;
    var curSlot = fightMob.loot.slot;

    if (mobGearRating === undefined) {
      return;
    } else {
      if (mobGearRating <= player.gear[curSlot].rating ||
        mobGearName === player.gear[curSlot].name){
        return;
      } else {
        player.gear[curSlot] = fightMob.loot;
        player.hp += player.gear[curSlot].hp;
        player.dmg[0] += player.gear[curSlot].dmg;
        updateStats(player); // currently redundant.  playerWin updates gear then updates stats.  keeping for now, not sure how else i may call this in the future.
        $('#player-gear-' + curSlot).html('');
        $('#player-gear-' + curSlot).append('<p>' + player.gear[curSlot].name +
        '</p>');
        $('#player-gear-' + curSlot).fadeIn(200).fadeOut(200).fadeIn(200);
        $(".player-status-event").prepend('<pre>You found ' +
        fightMob.loot.name + '!</pre>');
      }
    }
  }

  function playerDeath(player, fightMob, mobSwing) { // need a modal or something.
    $(".player-status-combat").prepend('<pre>You were hit for ' + mobSwing + ' and you succum to the damage.</pre>');
    $(".player-status-event").prepend('<pre>You got all the way to level ' + player.lvl + ' before you died!</pre>');
  }

})
