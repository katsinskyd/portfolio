import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameStart = false;
  gameOver = false;
  reroll = 5;
  str = 0;
  def = 0;

  lvl = 1;
  hp = 10;
  expRemaining = 10;

  battleExp = 0;
  battleTime = false;
  playerTurn = true;

  enemyHP = 0;
  enemyStr = 0;
  enemyDef = 0;

  score = 0;

  constructor() {}

  ngOnInit(): void {
  }

  rollStats() {
    this.reroll--;
    this.str = Math.floor(Math.random() * 10 + 1);
    this.def = Math.floor(Math.random() * 10 + 1);
    if (this.reroll==0) {
      this.gameStart = true;
    }
  }

  generateEnemy() {
    this.enemyHP = Math.floor(Math.random() * 10 + this.lvl);
    this.enemyStr = Math.floor(Math.random() * 10 + this.lvl);
    this.enemyDef = Math.floor(Math.random() * 10 + this.lvl);
    this.battleExp = this.enemyHP;
    this.battleTime = true;
    this.playerTurn = true;
  }

  playerAttack() {
    let attack: number;

    if (this.str <= this.enemyDef) {
      attack = 1;
    } else {
      attack = this.str - this.enemyDef;
    }

    this.enemyHP -= attack;

    if (this.enemyHP <= 0) {
      this.expGain();
    }
  }

  enemyAttack() {
    let attack: number;

    if (this.enemyStr <= this.def) {
      attack = 1;
    } else {
      attack = this.enemyStr - this.def;
    }

    this.hp -= attack;

    if (this.hp <= 0) {
      this.hp = 0;
      this.gameOver = true;
    }
  }

  battleTurn() {
    if (this.playerTurn) {
      this.playerAttack();
      this.playerTurn = false;
    } else {
      this.enemyAttack();
      this.playerTurn = true;
    }
  }

  expGain() {
    this.score++;
    this.battleTime = false;
    while (this.battleExp > 0) {
      this.expRemaining--;
      if (this.expRemaining == 0) {
        this.levelUp();
      }
      this.battleExp--;
    }
  }

  levelUp() {
    this.lvl++;
    this.expRemaining = this.lvl*10;
    this.hp = this.hp + (Math.floor(Math.random() * 10 + this.lvl))
    this.str = this.str + (Math.floor(Math.random() * 10 + this.lvl))
    this.def = this.def + (Math.floor(Math.random() * 10 + this.lvl))
  }

  restart() {
    this.gameStart = false;
    this.gameOver = false;
    this.reroll = 5;
    this.str = 0;
    this.def = 0;
  
    this.lvl = 1;
    this.hp = 10;
    this.expRemaining = 10;
    
    this.battleExp = 0;
    this.battleTime = false;
    this.playerTurn = true;

    this.score = 0;
  }
}
