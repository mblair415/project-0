![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Project 0: The Game
## Rat Kicker, the Game!
For this project I created a simple version of a classic RPG using the skills we learned in the first two weeks of bootcamp.  In this game you delve deeper into a dungeon encountering different types of creatures and searching for treasure.

Published project here: https://github.com/mblair415/project-0
Functional game hosted here:  https://www.bitballoon.com/sites/ratkickerthegame

## Technologies I used:
* html
* CSS
* Bootstrap
* JavaScript
* Jquery

I have a lot of object oriented programming.
I have multiple levels that function as rounds.
I have css manipulation through fadein/fadeout and with hover over states.


## Code I'm proud of:
This code is how combat takes place.  It displays complex nested functions that will recursively call themselves as needed, it also uses closures, and it intelligently uses a random damage generator a single time to determine hit damage as needed without calling for things in the case that they're not needed.

```javascript
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
```

I'm also proud of the code that updates gear for the player.  It uses closures to update global variables and it uses both dot and bracket notation to refer to JavaScript objects allowing me to use variables to write a single piece of code that will update no matter which of the 6 different slots are changed.  This will update player attributes (health and damage), and also update the UI for the player with the player's new loot, because getting loot is the best!
```javascript
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
      updateStats(player);
      $('#player-gear-' + curSlot).html('');
      $('#player-gear-' + curSlot).append('<p>' + player.gear[curSlot].name +
      '</p>');
      $('#player-gear-' + curSlot).fadeIn(200).fadeOut(200).fadeIn(200);
      $(".player-status-event").prepend('<pre>You found ' +
      fightMob.loot.name + '!</pre>');
    }
  }
}
```


## Screenshots:
http://imgur.com/a/mA4ZD
