import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent implements OnInit {
  
  ngOnInit(): void {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

  

}
