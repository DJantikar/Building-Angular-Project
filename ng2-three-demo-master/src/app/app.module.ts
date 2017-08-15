

import { AppComponent } from './app.component';
import { VoiceService } from './services/voice.service';
import { MusicService } from './services/music.service';

import { ThreeModule } from '../three/three.module';
import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr/dist";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ThreeModule],
  providers: [VoiceService, MusicService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private appRef: ApplicationRef) {
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
