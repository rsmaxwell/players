import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../utilities/mymaterial.module';
import { HeadersModule } from '../headers/headers.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PeopleListComponent } from './people/people.list/people.list.component';
import { PeoplePageComponent } from './people/people.page/people.page';
import { PeopleFilterComponent } from './people/people.filter/peoplefilter.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PersonPageComponent } from './person/person.page/person-page.component';
import { PersonDetailComponent } from './person/person.detail/persondetail.component';
import { PersonItemComponent } from './person/person.item/person.item.component';
import { AlertsModule } from '../alert/alerts.module';
import { AccountPageComponent } from './account/account.page/account-page.component';
import { AccountDetailComponent } from './account/account.detail/accountdetail.component';
import { AccountItemComponent } from './account/account.item/account.item.component';

@NgModule({
  declarations: [
    PeopleListComponent,
    PeoplePageComponent,
    PeopleFilterComponent,

    PersonPageComponent,
    PersonDetailComponent,
    PersonItemComponent,
    
    AccountPageComponent,
    AccountDetailComponent,
    AccountItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MyMaterialModule,
    CommonModule,
    AlertsModule,
    HeadersModule,
    ScrollingModule

  ],
  exports: [
    PeopleListComponent,
    PeoplePageComponent,
    PeopleFilterComponent,

    PersonPageComponent,
    PersonDetailComponent,
    PersonItemComponent,
    
    AccountPageComponent,
    AccountDetailComponent,
    AccountItemComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class PeopleModule { }
