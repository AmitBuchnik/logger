import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { environmentConfig } from 'src/environments/environment-config';
import { Config, CONFIG, Targets } from 'projects/my-lib/src/public-api';


export function createLoggerConfig() {
  const config = new Config();

  config.environment = {
    production: true
  };
  config.targets = [Targets.Console, Targets.LocaleStorage];
  config.messageFormat = {
    timestampFormat: 'HH:mm:ss'
  };
  config.flushTiming = 10;
  config.useQueue = true;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [{
    provide: CONFIG,
    // useClass: Config,
    useFactory: createLoggerConfig,
    // deps: [Config]
    // useValue: environmentConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

