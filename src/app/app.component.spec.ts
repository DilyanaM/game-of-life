import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let header: HTMLElement;
  let footer: HTMLElement;
  let routerOutlet: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    component = fixture.debugElement.componentInstance;

    header = document.querySelector('app-header');
    footer = document.querySelector('app-footer');
    routerOutlet = document.querySelector('router-outlet');
  });

  it('it should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('it should render a header, a footer and a router outlet', () => {
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
