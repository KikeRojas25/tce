import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet]

})
export class FinanzasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
