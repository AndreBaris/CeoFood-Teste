import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  carrinho = [];
  produtos = [];
  contadorItemCarrinho: BehaviorSubject<number>;
 
  constructor(private router: Router, private carrinhoService: CarrinhoService) {

  }
  // Setando as variaveis com as funcoes do service
  ngOnInit() {
    this.produtos = this.carrinhoService.getProdutos();
    this.carrinho = this.carrinhoService.getCarrinho();
    this.contadorItemCarrinho = this.carrinhoService.getContadorItemCarrinho();
  }
  // Chamando a funcao do service
  addAoCarrinho(produto) {
    this.carrinhoService.addProduto(produto);
  }
 // Navegando para a pag do carrinho
  abrirCarrinho() {
  this.router.navigate(['/carrinho'])
  }
  
 
}
