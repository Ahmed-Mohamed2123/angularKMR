import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { GoodsService } from './../../services/goods.service';
import { Good } from './../../interfaces/good.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  goods: Good[] = []
  goodsObservable: Subscription
  add: number = -1

  constructor(private gs: GoodsService,
    private cs: CartService,
    private as: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.goodsObservable = this.gs.getAllGoods().subscribe(data => { // فانكشن هتاخد العنصر وهتنفذ الفانكشن وتعمل ريتيرن للحاجه اللى هقولها عليها
      this.goods = data.map(element => { 
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }
      })
    })
  }

  ngOnDestroy() {
    this.goodsObservable.unsubscribe()
  }

  addToCart(index: number) {
    if (this.as.userId) this.add = +index;
    else this.router.navigate(['/login'])
  }

  buy(amount: number) {
    let selectedGood = this.goods[this.add]
    let data = {
      name: selectedGood.name,
      amount: +amount,
      price: selectedGood.price
    }
    this.cs.addToCart(data).then(() => this.add = -1)
  }

}
