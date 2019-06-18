import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
//import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
//import { Voucher } from '../../../model/cart.model';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import * as fromActions from './../actions/cart-voucher.action';

@Injectable()
export class CartVoucherEffects {
  constructor(
    private actions$: Actions,
    private cartVoucherConnector: CartVoucherConnector,
   // private cartService: CartService,
   // private messageService: GlobalMessageService
  ) {}

  // @Effect()
  // loadCartVouchers$: Observable<
  //   fromActions.CartVoucherAction
  // > = this.actions$.pipe(
  //   ofType(fromActions.LOAD_CART_VOUCHERS),
  //   map((action: fromActions.LoadCartVouchers) => action.payload),
  //   mergeMap(payload => {
  //     return this.cartVoucherConnector
  //       .loadAll(payload.userId, payload.cartId)
  //       .pipe(
  //         map((vouchers: Voucher[]) => {
  //           return new fromActions.LoadCartVouchers(vouchers);
  //         }),
  //         catchError(error => of(new fromActions.LoadCartVouchersFail(error)))
  //       );
  //   })
  // );

  @Effect()
  addCartVoucher$: Observable<
    fromActions.CartVoucherAction
  > = this.actions$.pipe(
    ofType(fromActions.ADD_CART_VOUCHER),
    map((action: fromActions.AddCartVoucher) => action.payload),
    mergeMap(payload => {
      return this.cartVoucherConnector
        .add(payload.userId, payload.cartId, payload.voucherId)
        .pipe(
          map((data: any) => {
            return new fromActions.AddCartVoucherSuccess(data);
          }),
          catchError(error => of(new fromActions.AddCartVoucherFail(error)))
        );
    })
  );

  @Effect()
  deleteCartVoucher$: Observable<
    fromActions.CartVoucherAction
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_CART_VOUCHER),
    map((action: fromActions.RemoveCartVoucher) => action.payload),
    mergeMap(payload => {
      return this.cartVoucherConnector
        .delete(payload.userId, payload.cartId, payload.voucherId)
        .pipe(
          map((data: any) => {
            return new fromActions.RemoveCartVoucherSuccess(data);
          }),
          catchError(error => of(new fromActions.RemoveCartVoucherFail(error)))
        );
    })
  );

}
