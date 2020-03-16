import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private fs: AngularFirestore,
    private storage: AngularFireStorage) { }

  getAllGoods() {
    return this.fs.collection('goods').snapshotChanges() // الفاليو شانجيس دى بترجع اوبزيرفابل يعنى حاجه تراقب الداتا
  }

  addNewGood(name: string, price: number, image: File) {
    // this.storage.ref('goods/').child(image.name) دا بيجيب نفس الحاجه اللى تحت
    return new Promise((resolve, reject) => {
      let ref = this.storage.ref('goods/' + image.name)
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe(photoUrl => {
          this.fs.collection('goods').add({
            name,
            price,
            photoUrl
          }).then(() => resolve('hello'))
        })
      })
    })
  }
}
