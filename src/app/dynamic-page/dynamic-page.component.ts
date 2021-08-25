import { IPage } from './../interfaces/page.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
})
export class DynamicPageComponent implements OnInit {
  @Input() activePage: IPage | undefined;

  constructor() {}

  ngOnInit(): void {}
}
