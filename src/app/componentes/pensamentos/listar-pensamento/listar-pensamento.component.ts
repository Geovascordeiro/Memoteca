import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from '../pensamento/pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos:Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    //Faz parte do ciclo de vida do componente
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);

      if(!listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }
  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro)
    .subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    })
  }
}
