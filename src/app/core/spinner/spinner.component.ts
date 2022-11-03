import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loading$ = this.loaderSvc.loading$;

  constructor(private loaderSvc : LoadingService) {

  }

  ngOnInit(): void {
  }

}
