import { GoodsService } from './../../services/goods.service';
import { Good } from './../../interfaces/good.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image', { static: true }) image: ElementRef

  constructor(private gs: GoodsService) { }

  ngOnInit() {
  }

  addNewGood(form: NgForm) {
    let name = (<Good>form.value).name,
        price = (<Good>form.value).price,
        image = (this.image.nativeElement as HTMLInputElement).files[0];
    this.gs.addNewGood(name, price, image).then(msg => console.log(msg))
  }

}
