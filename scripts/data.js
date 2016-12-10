// $(document).ready(function() {
//   console.log("data.js loads")
//
//   var player = {
//     name : "Frodo",  // eventually a field the player can enter a name into
//     level : 1, // a function?  not sure yet.  not sure how i want to handle xp yet.
//     xp : 0,
//     hp : 10,  // eventually an equation.   combination of gear bonuses and level with a modifier for class.
//     dmg : [0, 1, 2],
//     gear : {
//       head : {},
//       arms : {},
//       chest : {},
//       hands : {},
//       legs : {
//         slot: legs,
//         name : "pants of modesty",
//         hp : 0,
//         dmg : [0, 0, 0]
//       },
//       feet : {}
//     }
//   }
//
//   var mobs = {
//     difficulty1 : [
//       {
//         name : "small, malnourished, infant rat",
//         image : "http://img.photobucket.com/albums/v661/Pandara1/IRL%20Pets/sideview.jpg",
//         lvl : 1,
//         xp : 1,
//         hp : 3,
//         dmg : [0, 1, 1],
//         loot : {}
//       },
//       {
//         name : 'sleeping infant rat',
//         image : 'https://media.mnn.com/assets/images/2015/06/rat-sleeping.jpg',
//         lvl : 1,
//         xp : 1,
//         hp : 5,
//         dmg : [0, 0, 2],
//         loot : {
//           slot : 'head',
//           name : 'dirty burlap sack with holes in it',
//           hp : 1,
//           dmg : [0, 0, 0]
//           }
//         },
//         {
//           name : 'old, nearly toothless, feeble rat',
//           lvl : 2,
//           xp : 2,
//           hp : 8,
//           dmg : [0, 2, 3],
//           loot : {
//             slot : 'feet',
//             name : 'gore covered strips of fur',
//             hp : 2,
//             dmg : [1, 0, 0]
//           }
//         }
//       }
//     ]
//   }
//
// })

var player = {
  name : 'Frodo',  // eventually a field the player can enter a name into
  lvl : 1, // a function?  not sure yet.  not sure how i want to handle xp yet.
  xp : 0,
  hp : 10,  // eventually an equation.   combination of gear bonuses and level with a modifier for class.
  dmg : [0, 1, 4],
  gear : {
    head : {
      name : 'bullshit',
      hp : 0,
      dmg : 0,
      rating : 0
    },
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


function updateGear(player, fightMob){
  var mobRating = fightMob.loot.rating;
  var curSlot = fightMob.loot.slot;
  console.log(curSlot)

  if (mobRating === undefined) {
    return;
  } else {
    if (mobRating < player.gear[curSlot].rating){
      return;
    } else {
      player.gear[curSlot] = fightMob.loot
      console.log(player.gear[curSlot])
    }
  }
}

updateGear(player, mobs.difficulty1[2])
