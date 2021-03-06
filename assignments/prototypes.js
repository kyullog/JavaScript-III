/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by uncommenting these 3 objects and the list of console logs below:
// GameObject constructor
const GameObject = function (attributes) {
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

// CharacterStats constructor
const CharacterStats = function (attributes) {
  GameObject.call(this, attributes);
  this.hp = attributes.hp;
  this.name = attributes.name;
  this.alive = true;
}

// Creates inheritance for CharacterStats from GameObject
CharacterStats.prototype = Object.create(GameObject.prototype);

// Humanoid constructor
const Humanoid = function (attributes) {
  CharacterStats.call(this, attributes);
  this.faction = attributes.faction;
  this.weapons = attributes.weapons;
  this.language = attributes.language;
}

//Creates inheritance for Humanoid from CharacterStats
Humanoid.prototype = Object.create(CharacterStats.prototype);



//Prototype methods

GameObject.prototype.destroy = function () {
  if (this.alive) this.alive = false;
  if (!this.name) return `Game object was removed from the game.`;
  else return `${this.name} was removed from the game.`;
}

CharacterStats.prototype.takeDamage = function () {
  if (!this.alive) return "He's dead, Jim.";
  let damage = (Math.floor(Math.random() * 10));
  this.hp -= damage;
  if (this.hp <= 0) return this.destroy();
  else return `${this.name} took ${damage} damage.  ${this.hp} remaining`;
}

Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}.`;
}
const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  hp: 5,
  name: 'Bruce',
  faction: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Toungue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  hp: 15,
  name: 'Sir Mustachio',
  faction: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Toungue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  hp: 10,
  name: 'Lilith',
  faction: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});


console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.hp); // 15
console.log(mage.name); // Bruce
console.log(swordsman.faction); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task: 
// * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
// * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villian and one a hero and fight it out with methods!

// Hero 
const Hero = function (attributes) {
  Humanoid.call(this, attributes);
  this.mp = attributes.mp;
  this.str = attributes.str;
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.strike = function (target) {
  if (!this.alive) return `You can't do that, you're dead!`;
  else if (!target.alive) return `You just going to hack at that corpse all day?`;
  else {
    if ((Math.random() * 10) < 5) return target.takeDamage();
    else return "Attack missed";
  }
}

// Villain
const Villain = function (attributes) {
  Humanoid.call(this, attributes);
  this.mp = attributes.mp;
  this.str = attributes.str;
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.fireball = function (target) {
  if (!this.alive) return `Dead wizards cast no spells`;
  else if (!target.alive) return `Hard to get him more burnt than that.`;
  else {
    if (this.mp < 3) {
      this.mp += 1;
      return `You do not have enough MP`;
    } else {
      this.mp -= 3;
      if ((Math.random() * 10) < 5) return target.takeDamage();
      else return "Attack missed";
    }
  }
}

// Playing God

const heros = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 1,
    height: 4
  },
  hp: 18,
  name: "Heros",
  faction: "River Raiders",
  weapons: ["The Smasheroo"],
  language: "Esperanto",
  mp: 0,
  str: 10
})

const villos = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  hp: 13,
  name: "Villos",
  faction: "Order of No Quarter",
  weapons: ["Staff of Flambert"],
  language: "Argonian",
  mp: 17,
  str: 2
})
// Battle

for (let i = 0; i < 100; i++) {
  console.log(heros.strike(villos));
  console.log(villos.fireball(heros));
  if ((!heros.alive) || (!villos.alive)) break;
}

