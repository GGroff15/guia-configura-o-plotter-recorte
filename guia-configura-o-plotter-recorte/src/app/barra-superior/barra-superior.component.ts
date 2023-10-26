import * as M from 'materialize-css';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

}
