![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Project 0: The Game
## Rat Kicker, the Game!
For this project I created a simple version of a classic RPG using the skills we learned in the first two weeks of bootcamp.  In this game you delve deeper into a dungeon encountering different types of creatures and searching for treasure.

## Technologies I used:
* html
* CSS
* Bootstrap
* JavaScript
* Jquery

## Code I'm proud of:
This code is how combat takes place.  It displays complex nested functions that will recursively call themselves as needed, it also uses closures, and it intelligently uses a random damage generator a single time to determine hit damage as needed without calling for things in the case that they're not needed.

```javascript
function combat(player, fightMob){ // set up temp hp for mob.  recursive loop for combat
  var tempMobHp = fightMob.hp;
  roundOfCombat(player,fightMob);

  function roundOfCombat(player, fightMob, tempMobHp){  // this portion will loop until player or mob is dead
    console.log("a round of combat has started")
    var playerSwing = damage(player.dmg);
    console.log("round start player dmg " + playerSwing + " mob hp " + tempMobHp);
    if (tempMobHp - playerSwing < 1) {
      playerWin(player, fightMob, playerSwing);
    } else {
      var mobSwing = damage(fightMob.dmg);
      tempMobHp -= playerSwing;
      if (player.hp - damage(fightMob.dmg) < 1) {
        playerDeath(fightMob);
      } else {
        player.hp -= mobSwing;
        updateStats(player);
        roundOfCombat(player, fightMob, tempMobHp); // recursive loop
      }
    }
  }
}
```

I'm also proud of the code that updates gear for the player.  It uses closures to update global variables and it uses both dot and bracket notation to refer to JavaScript objects allowing me to use variables to write a single piece of code that will update no matter which of the 6 different slots are changed.  This will update player attributes (health and damage), and also update the specific field with the player's new loot.
```javascript
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
    }
  }
}
```


## Screenshots:
