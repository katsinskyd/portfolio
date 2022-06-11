import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GalleryComponent } from './portfolio/gallery/gallery.component';
import { CommissionsComponent } from './portfolio/commissions/commissions.component';
import { ConnectComponent } from './connect/connect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PortfolioComponent,
    GalleryComponent,
    CommissionsComponent,
    ConnectComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
