import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Interface utilizada para utilizar dentro das Arrays
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  qtd: number;
}
@Injectable({
  providedIn: 'root'
})

export class CarrinhoService {
  // Lista de produtos chumbado somente para o teste
  produtos: Produto[] = [
    { id: 0, nome: 'Sushi', preco: 8.99, qtd: 1 },
    { id: 1, nome: 'Sashimi', preco: 5.99, qtd: 1 },
    { id: 2, nome: 'Hot Roll', preco: 4.99, qtd: 1 },
    { id: 3, nome: 'Temaki', preco: 6.99, qtd: 1 }
  ];
 
  private carrinho = [];
  private contadorCarrinho = new BehaviorSubject(0);
 
  constructor() {

   }
   // retorna a Array com todos os produtos 
   getProdutos() {
    return this.produtos;
  }
  // retorna a array do carrinho
  getCarrinho() {
    return this.carrinho;
  }
 // retorna o contador dentro da Array do carrinho
  getContadorItemCarrinho() {
    return this.contadorCarrinho;
  }
// add o produto dentro da Array do carrinho, quase ja nao tenha sido add
  addProduto(produto) {
    let adcionado = false;
    for (let p of this.carrinho) {
      if (p.id === produto.id) {
        p.qtd += 1;
        adcionado = true;
        break;
      }
    }
    if (!adcionado) {
      this.carrinho.push(produto);
    }
    this.contadorCarrinho.next(this.contadorCarrinho.value + 1);
  }
 // retira somente 1 produto dentro do carrinho, caso exista. Utiliza index para 
 // a procura da posicao correta do produto dentro da Array
  retirarProduto(produto) {
    for (let [index, p] of this.carrinho.entries()) {
      if (p.id === produto.id) {
        p.qtd -= 1;
        if (p.qtd == 0) {
          this.carrinho.splice(index, 1);
        }
      }
    }
    this.contadorCarrinho.next(this.contadorCarrinho.value - 1);
  }
 // remove todos os produtos selecionados dentro do carrinho. Utiliza o index para procurar
 // a posicao correta do produto dentro da Array
  removerProdutos(produto) {
    for (let [index, p] of this.carrinho.entries()) {
      if (p.id === produto.id) {
        this.contadorCarrinho.next(this.contadorCarrinho.value - p.qtd);
        this.carrinho.splice(index, 1);
      }
    }
  }
}
