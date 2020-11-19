import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollectionComponent } from './component/collection/collection.component';
import { SearchComponent } from './component/search/search.component';
import { TeamComponent } from './component/team/team.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'team', component: TeamComponent },

  
  { path: 'search', pathMatch:'full', redirectTo: 'search' },
  { path: '**', pathMatch:'full', redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
