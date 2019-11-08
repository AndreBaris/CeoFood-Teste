import { Component, OnInit } from '@angular/core';
import { Produto } from '../carrinho.service';
import { CarrinhoService } from "../carrinho.service";

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})


export class CarrinhoPage implements OnInit {
  taxa = 4;
  carrinho: Produto[] = [];
 
 
  constructor(private carrinhoService: CarrinhoService) { }
 
  ngOnInit() {
    this.carrinho = this.carrinhoService.getCarrinho();
  }
  // retira somente 1 produto da Array do carrinho
  retirarProduto(produto) {
    this.carrinhoService.retirarProduto(produto);
  }
 // aumenta somente 1 produto da Array do carrinho
  aumentarProduto(produto) {
    this.carrinhoService.addProduto(produto);
  }
 // remove todos os produtos selecionados da Array do carrinho
  removerProdutos(produto) {
    this.carrinhoService.removerProdutos(produto);
  }
 // retorna a soma total somente dos produtos selecionados dentro da Array
  getSubTotal() {
    return this.carrinho.reduce((i, j) => i + j.preco * j.qtd, 0);
  }
  // retorna o total, subtotal + taxa
  getTotal() {
    let total = this.getSubTotal() + this.taxa;
    return total;
  }
}
