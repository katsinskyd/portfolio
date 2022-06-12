import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewChecked {

  gameStart = false;
  gameOver = false;
  reroll = 5;

  lvl = 1;
  str = 0;
  def = 0;
  hp = 10;
  maxHP = 10;
  expRemaining = 10;

  battleExp = 0;
  battleTime = false;
  playerTurn = true;

  enemyHP = 0;
  enemyStr = 0;
  enemyDef = 0;

  score = 0;

  potions = 0;
  msg: string[] = [];
  
  constructor() {}

  ngOnInit(): void {
  }

  @ViewChild('messages')
  private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  rollStats() {
    this.reroll--;
    this.str = Math.floor(Math.random() * 10 + 1);
    this.def = Math.floor(Math.random() * 10 + 1);
    this.potions = Math.floor(Math.random() * 3);
    if (this.reroll==0) {
      this.gameStart = true;
    }
  }

  generateEnemy() {
    this.enemyHP = Math.floor(Math.random() * 10 * this.lvl + (this.lvl*2));
    this.enemyStr = Math.floor(Math.random() * 10 * this.lvl + (this.lvl*2));
    this.enemyDef = Math.floor(Math.random() * 10 * this.lvl + (this.lvl*2));
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

    let damage = this.enemyHP;
    this.enemyHP -= (attack + Math.floor(Math.random() * 10));
    this.msg.push(`You deal ${damage - this.enemyHP} damage!`);

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

    let damage = this.hp;
    this.hp -= (attack + Math.floor(Math.random() * 10));;
    this.msg.push(`The enemy deals ${damage - this.hp} damage!`);

    if (this.hp <= 0) {
      this.hp = 0;
      this.gameOver = true;
      this.msg.push(`Game over... Final score: ${this.score}`)
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

  usePotion() {
    this.potions--;
    let recoveredHP = Math.floor(Math.random() * 10 + 5);
    this.hp += recoveredHP;
    if (this.maxHP < this.hp) {
      this.hp = this.maxHP;
    }
    this.msg.push(`Recovered ${recoveredHP} HP!`)
    this.playerTurn = false;
  }

  expGain() {
    this.msg.push(`Gained ${this.battleExp} experience!`);
    this.score++;
    this.battleTime = false;
    while (this.battleExp > 0) {
      this.expRemaining--;
      if (this.expRemaining == 0) {
        this.levelUp();
      }
      this.battleExp--;
    }

    let getPotion = Math.floor(Math.random() * 10 + 1);
    if (getPotion % 2 == 0) {
      this.msg.push('Found a potion!')
      this.potions++;
    }
  }

  levelUp() {
    let prevHp = this.maxHP;
    let prevStr = this.str;
    let prevDef = this.def;
    this.msg.push('Level up!')
    this.lvl++;
    this.expRemaining = this.lvl*10;
    this.hp = this.maxHP + (Math.floor(Math.random() * 10 * this.lvl))
    this.str = this.str + (Math.floor(Math.random() * 10 + 1))
    this.def = this.def + (Math.floor(Math.random() * 10 + 1))
    this.msg.push(`HP increased by ${this.maxHP - prevHp}`)
    this.msg.push(`Attack increased by ${this.str - prevStr}`)
    this.msg.push(`Defense increased by ${this.def - prevDef}`)
    this.maxHP = this.hp;
  }

  restart() {
    this.gameStart = false;
    this.gameOver = false;
    this.reroll = 5;
    this.str = 0;
    this.def = 0;
  
    this.lvl = 1;
    this.hp = 10;
    this.maxHP = 10;
    this.expRemaining = 10;
    
    this.battleExp = 0;
    this.battleTime = false;
    this.playerTurn = true;

    this.score = 0;
    this.potions = 0;
    this.msg = [];
  }
}
