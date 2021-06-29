import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatePipe } from './pipes/paginate.pipe';
import { RemoveArrowPipe } from './pipes/remove-arrow.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DividerPipe } from './pipes/divider.pipe';
import { TableComponent } from './components/table/table.component';

import { AppRoutingModule } from '../app-routing.module';
import { DetailsComponent } from './components/details/details.component';




@NgModule({
  declarations: [
    PaginatePipe,
    RemoveArrowPipe,
    HeaderComponent,
    FooterComponent,
    DividerPipe,
    TableComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    PaginatePipe,
    RemoveArrowPipe,
    HeaderComponent,
    FooterComponent,
    DividerPipe,
    TableComponent,
    DetailsComponent
  ]
})
export class SharedModule { }
