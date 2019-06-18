//import { Voucher } from '../../../model/cart.model';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';

// export const LOAD_CART_VOUCHERS = '[Cart] Load Cart Vouchers';
// export const LOAD_CART_VOUCHERS_FAIL = '[Cart] Load Cart Vouchers Fail';
// export const LOAD_CART_VOUCHERS_SUCCESS = '[Cart] Load Cart Vouchers Success';

export const ADD_CART_VOUCHER = '[Cart] Add Cart Vouchers';
export const ADD_CART_VOUCHER_FAIL = '[Cart] Add Cart Voucher Fail';
export const ADD_CART_VOUCHER_SUCCESS = '[Cart] Add Cart Voucher Success';

export const REMOVE_CART_VOUCHER = '[Cart] Remove Cart Voucher';
export const REMOVE_CART_VOUCHER_FAIL = '[Cart] Remove Cart Voucher Fail';
export const REMOVE_CART_VOUCHER_SUCCESS = '[Cart] Remove Cart Voucher Success';

// export class LoadCartVouchers extends LoaderLoadAction {
//   readonly type = LOAD_CART_VOUCHERS;
//   constructor(public payload: any) {
//     super(CART_DATA);
//   }
// }

// export class LoadCartVouchersFail extends LoaderFailAction {
//   readonly type = LOAD_CART_VOUCHERS_FAIL;
//   constructor(public payload: any) {
//     super(CART_DATA, payload);
//   }
// }

// export class LoadCartVouchersSuccess extends LoaderSuccessAction {
//   readonly type = LOAD_CART_VOUCHERS_SUCCESS;
//   constructor(public payload: Voucher[]) {
//     super(CART_DATA);
//   }
// }

// Adding cart voucher actions
export class AddCartVoucher extends LoaderLoadAction {
  readonly type = ADD_CART_VOUCHER;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class AddCartVoucherFail extends LoaderFailAction {
  readonly type = ADD_CART_VOUCHER_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class AddCartVoucherSuccess extends LoaderSuccessAction {
  readonly type = ADD_CART_VOUCHER_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

// Deleting cart voucher
export class RemoveCartVoucher extends LoaderLoadAction {
  readonly type = REMOVE_CART_VOUCHER;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class RemoveCartVoucherFail extends LoaderFailAction {
  readonly type = REMOVE_CART_VOUCHER_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class RemoveCartVoucherSuccess extends LoaderSuccessAction {
  readonly type = REMOVE_CART_VOUCHER_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

// action types
export type CartVoucherAction =
  // | LoadCartVouchers
  // | LoadCartVouchersFail
  // | LoadCartVouchersSuccess
  | AddCartVoucher
  | AddCartVoucherFail
  | AddCartVoucherSuccess
  | RemoveCartVoucher
  | RemoveCartVoucherFail
  | RemoveCartVoucherSuccess;
