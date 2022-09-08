import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alphashop';
  saluti: string = 'Benarrivaten in ' + this.title;
  bollini: number = 1500;
}
