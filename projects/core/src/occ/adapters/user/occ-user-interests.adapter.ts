import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import {
  ProductInterestList,
  ProductInterestRelation,
} from '../../../model/product-interest.model';
import { Image } from '../../../model/image.model';
import { OccConfig } from '../../config/occ-config';

@Injectable()
export class OccUserInterestsAdapter implements UserInterestsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected config: OccConfig
  ) {}

  public getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ProductInterestList> {
    const url = this.getEndPoint(userId);
    let params = new HttpParams().set('sort', sort ? sort : 'name:asc');

    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers, params }).pipe(
      tap((r: any) => {
        if (r.results) {
          r.results.forEach(
            (item: any) =>
              (item.product.images = this.convertImages(item.product.images))
          );
        }
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public removeInterests(
    userId: string,
    item: ProductInterestRelation
  ): Observable<any[]> {
    const r: Observable<any>[] = [];
    item.productInterestEntry.forEach((entry: any) => {
      const params: HttpParams = new HttpParams()
        .set('productCode', item.product.code)
        .set('notificationType', entry.interestType);
      r.push(
        this.http
          .delete(this.getEndPoint(userId), { params: params })
          .pipe(catchError((error: any) => throwError(error)))
      );
    });
    return forkJoin(r);
  }

  protected getEndPoint(userId: string): string {
    return this.occEndpoints.getEndpoint(
      '/users/' + userId + '/productinterests'
    );
  }

  private convertImages(source: Image[]): any {
    const images = {};
    if (source) {
      for (const image of source) {
        const isList = image.hasOwnProperty('galleryIndex');
        if (!images.hasOwnProperty(image.imageType)) {
          images[image.imageType] = isList ? [] : {};
        }

        let imageContainer: any;
        if (isList && !images[image.imageType][image.galleryIndex]) {
          images[image.imageType][image.galleryIndex] = {};
        }

        if (isList) {
          imageContainer = images[image.imageType][image.galleryIndex];
        } else {
          imageContainer = images[image.imageType];
        }
        // set full image URL path
        image.url = (this.config.backend.occ.baseUrl || '') + image.url;

        imageContainer[image.format] = image;
      }
    }
    return images;
  }
}