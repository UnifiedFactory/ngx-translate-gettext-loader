# Description
Load gettext files for use with [ngx-translate](https://github.com/ngx-translate/core)

## Usage:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { GettextLoader } from '@unifiedfactory/ngx-translate-gettext-loader';
import { AppComponent } from './app';

export function GettextLoaderFactory(httpClient: HttpClient) {
	return new GettextLoader(httpClient, 'assets/i18n', '.po');
}

@NgModule({
	imports: [
		BrowserModule,
    HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: GettextHttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
```
