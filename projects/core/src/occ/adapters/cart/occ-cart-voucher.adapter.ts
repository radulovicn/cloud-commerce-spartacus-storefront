import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CartVoucherAdapter } from '../../../cart/connectors/voucher/cart-voucher.adapter';
import { CART_VOUCHER_NORMALIZER } from '../../../cart/connectors/voucher/converters';
import { Voucher } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCartVoucherAdapter implements CartVoucherAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartVoucherEndpoint(userId: string, cartId): string {
    const cartVoucherEndpoint = `users/${userId}/carts/${cartId}/vouchers`;
    return this.occEndpoints.getEndpoint(cartVoucherEndpoint);
  }

  public loadAll(
    userId: string,
    cartId: string,
  ): Observable<Voucher[]> {
    const url = this.getCartVoucherEndpoint(userId,cartId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Occ.VoucherList>(url, { headers }).pipe(
      catchError((error: any) => throwError(error)),
      map(voucherList => voucherList.vouchers),
      this.converter.pipeableMany(CART_VOUCHER_NORMALIZER)
    );
  }

  add(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId,cartId);

    const toAdd = JSON.stringify({});
    const params = new HttpParams({
      fromString: 'voucherId=' + voucherId ,
    });

    return this.http
      .post(url, toAdd, { params })
      .pipe(
        catchError((error: any) => throwError(error.json())),
        this.converter.pipeable(CART_VOUCHER_NORMALIZER)
      );
  }

  

  delete(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId,cartId)+'/'+voucherId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
