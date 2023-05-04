import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent implements OnInit {
  constructor() {}

  @Input() name: string = '';
  @Input() title: string = '';

  ngOnInit() {}
}
