import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { DEFAULT_CONTEXT, DEFAULT_PREFIX, DEFAULT_SUFFIX } from 'constants';
import * as gettext from 'gettext-parser';
import { Observable } from 'rxjs/Observable';
import { getTextSuffix } from './models';

export class GettextLoader implements TranslateLoader {

  constructor(
    private httpClient: HttpClient,
    private prefix: string = DEFAULT_PREFIX,
    private suffix: getTextSuffix = DEFAULT_SUFFIX,
    private context: string = DEFAULT_CONTEXT
  ) {}

  /**
   * Gets the translations from file
   * @param lang
   * @returns {any}
   */
  getTranslation(lang: string): Observable<any> {
    return this.httpClient
      .get(`${this.prefix}${lang}${this.suffix}`, { responseType: 'text' })
      .map((contents: string) => this.parse(contents, this.suffix));
  }

  /**
   * Parse gettext file
   * @param contents - .po or .mo file loaded as text
   * @returns { [key: string]: }
   */
  private parse(contents: string, suffix: getTextSuffix): { [key: string]: string } {
    let translations: { [key: string]: string };

    switch (suffix) {
      case '.po': {
        translations = gettext.po.parse(contents, 'utf-8');
        break;
      }
      case '.mo': {
        translations = gettext.mo.parse(contents, 'utf-8');
        break;
      }
      default: {
        translations = {};
      }
    }

    if (!translations.hasOwnProperty(this.context)) {
      return translations;
    }

    return Object.keys(translations[this.context])
      .reduce((result, key) => {
        const translation: string = translations[this.context][key].msgstr.pop();

        if (key.length > 0 && translation.length > 0) {
          result[key] = translation;
        }

        return result;
      }, {});
  }

}
