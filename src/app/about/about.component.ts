import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  path: string = "src\assets\images\profile.png";
  alttext: string="it's me!"

  constructor() { }

  ngOnInit(): void {
  }

}
