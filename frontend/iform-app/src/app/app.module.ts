import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';  

import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import {ChartsModule} from 'ng2-charts';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/scroll/scroll-strategy';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SafePipe } from './safe.pipe';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DesignViewerComponent } from './design-viewer/design-viewer.component';

import { TokenInterceptor } from './virtual-twins.service';
import { SolidificationModelsComponent } from './solidification-models/solidification-models.component';
import { MechanicalComponent } from './mechanical/mechanical.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SafePipe,
    LineChartComponent,
    DesignViewerComponent,
    SolidificationModelsComponent,
    MechanicalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    ChartsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCarouselModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }