import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutModule } from '../../layout/store-finder-page-layout/store-finder-page-layout.module';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { StoreFinderListCountComponent } from '../../../store-finder/components/store-finder-list-count/store-finder-list-count.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';

const routes: Routes = [
  {
    path: 'store-finder',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: 'find-stores',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderListComponent
      },
      {
        path: 'view-all-stores',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderListCountComponent
      },
      {
        path: 'country/:country/region/:region',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderGridComponent
      },
      {
        path: 'country/:country',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderGridComponent
      },
      {
        path: 'country/:country/region/:region/:store',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderStoreDescriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreFinderPageLayoutModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
