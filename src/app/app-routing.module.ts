import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'books/:author/:title',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule)
  },
  {
    path: 'cover/:id',
    loadChildren: () => import('./cover/cover.module').then( m => m.CoverPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
