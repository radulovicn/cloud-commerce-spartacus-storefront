import { Cart } from '../../../model/cart.model';
import * as fromActions from './../actions';
import * as fromCart from './cart.reducer';

fdescribe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCart;
      const action = {} as any;
      const state = fromCart.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_CART_SUCCESSS or LOAD_CART_SUCCESS action', () => {
    it('should create an empty cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        totalItems: 0,
        totalPrice: {
          currencyIso: 'USD',
          value: 0,
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          value: 0,
        },
      };
      const { initialState } = fromCart;

      const action = new fromActions.CreateCartSuccess(testCart);
      const state = fromCart.reducer(initialState, action);

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({});
      expect(state.refresh).toEqual(false);
      expect(state.appliedVouchers).toEqual([]);
    });

    it('should load an existing cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        totalItems: 0,
        entries: [{ entryNumber: 0, product: { code: '1234' } }],
        totalPrice: {
          currencyIso: 'USD',
          value: 0,
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          value: 0,
        },
        appliedVouchers: [{ code: 'testVoucherId' }],
      };

      const { initialState } = fromCart;

      const action = new fromActions.LoadCartSuccess(testCart);
      const state = fromCart.reducer(initialState, action);

      delete testCart['entries'];

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } },
      });
      expect(state.refresh).toEqual(false);
      expect(state.appliedVouchers).toEqual([{ code: 'testVoucherId' }]);
    });
  });

  describe('REMOVE_ENTRY_SUCCESS or ADD_ENTRY_SUCCESS action', () => {
    it('should set refresh to true', () => {
      const { initialState } = fromCart;

      const action = new fromActions.AddEntrySuccess({});
      const state = fromCart.reducer(initialState, action);
      expect(state.refresh).toEqual(true);
    });
  });

  describe('REMOVE_CART_VOUCHER_SUCCESS or ADD_CART_VOUCHER_SUCCESS action', () => {
    it('should set refresh to true', () => {
      const { initialState } = fromCart;

      const action = new fromActions.AddCartVoucherSuccess({});
      const state = fromCart.reducer(initialState, action);
      expect(state.refresh).toEqual(true);
    });
  });
});
