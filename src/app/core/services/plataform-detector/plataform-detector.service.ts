import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetector {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
