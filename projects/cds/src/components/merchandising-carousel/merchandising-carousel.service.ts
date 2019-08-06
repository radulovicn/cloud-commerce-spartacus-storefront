import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SemanticPathService } from '@spartacus/core';
import { ProductCarouselItem } from '@spartacus/storefront';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdsConfig } from '../../config/config.model';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselService {
  constructor(
    protected httpClient: HttpClient,
    protected config: CdsConfig,
    protected semanticPathService: SemanticPathService
  ) {}

  load(strategy: string) {
    return this.httpClient
      .get(this.getEndpoint(strategy))
      .pipe(map(response => this.convert(response)));
  }

  /**
   *
   * converts merchandising product data to the ProductCarouselItem model.
   */
  protected convert(response: any) {
    console.log('merchan service', response);
    return response.products.map(p => {
      console.log('brian', p);
      return of(<ProductCarouselItem>{
        name: p.name,
        price: p.price,
        code: p.id,
        images: {
          PRIMARY: {
            product: {
              format: 'product',
              imageType: 'PRIMARY',
              url: p.mainImage,
            },
          },
        },
      });
    });
  }

  private getEndpoint(strategy: string): string {
    let url = this.config.cds.baseUrl;
    url += '/strategy/';
    url += this.config.cds.tenantId;
    url += '/strategies/';
    url += strategy;
    url += '/products';
    return url;
  }
}
