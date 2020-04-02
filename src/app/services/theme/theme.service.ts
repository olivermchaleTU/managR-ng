import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor() {
    const preferredTheme = localStorage.getItem('preferredTheme');
    preferredTheme === 'dark' ? this.setDarkTheme() : this.setLightTheme();
  }
  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    localStorage.setItem('preferredTheme', 'dark');
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    localStorage.setItem('preferredTheme', 'light');
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}

export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--theme-main': 'white',
    '--background-default': '#f6f8f9',
    '--card-default': 'white',
    '--text-main': 'black'
  }
};

export const dark: Theme = {
    name: 'dark',
    properties: {
      '--theme-main': '#121212',
      '--background-default': '#1e1e1e',
      '--card-default': '#121212',
      '--text-main': 'white'
    }
}
