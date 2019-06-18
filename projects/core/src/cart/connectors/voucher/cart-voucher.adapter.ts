import { Observable } from 'rxjs';
import { Voucher } from '../../../model/cart.model';

export abstract class CartVoucherAdapter {
   /**
   * Abstract method used to get applied to cart vouchers
   *
   * @param userId
   * @param cartId
   */
  abstract loadAll(userId: string, cartId: string): Observable<Voucher[]>;

  /**
   * Abstract method used to apply voucher to cart 
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
    abstract add(userId: string, cartId: string, voucherId:string): Observable<{}>;

/**
   * Abstract method used to remove voucher from cart 
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
  abstract delete(userId: string, cartId: string, voucherId:string): Observable<{}>;
}
