import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignViewerComponent } from './design-viewer/design-viewer.component';
import { SolidificationModelsComponent } from './solidification-models/solidification-models.component';
import { MechanicalComponent } from './mechanical/mechanical.component';

// import { ProductsListComponent } from './products-list/products-list.component';
// import { DesignViewerComponent } from './design-viewer/design-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/MeltPool', pathMatch: 'full' },
  { path: 'MeltPool', component: DesignViewerComponent },
  { path: 'Solidification', component: SolidificationModelsComponent },
  { path: 'Mechanical', component: MechanicalComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }