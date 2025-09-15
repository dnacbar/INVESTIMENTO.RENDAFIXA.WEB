import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-menu',
  imports: [TypeaheadModule, CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  public investidores: string[] = [
    '12345678900', // exemplo de documentoFederal
    '98765432100',
    '11223344556'
  ];
  public selectedInvestidor: string = '';
}
