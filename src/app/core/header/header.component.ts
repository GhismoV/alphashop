import { Component, OnInit } from '@angular/core';
import { AuthappJwtService } from 'src/services/authappjwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authSvc: AuthappJwtService) {

  }

  ngOnInit(): void {
  }

}
