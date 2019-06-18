import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from '../../../model/cart.model';
import { CartVoucherAdapter } from './cart-voucher.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartVoucherConnector {
  constructor(protected adapter: CartVoucherAdapter) {}

  public loadAll(userId: string, cartId: string): Observable<Voucher[]> {
    return this.adapter.loadAll(userId, cartId);
  }

  public add(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.add(userId, cartId, voucherId);
  }

  public delete(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.delete(userId, cartId, voucherId);
  }
}
