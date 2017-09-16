// FOR TESTING
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// IONIC PROVIDERS CLASSES AND MOCKS
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';

// PROVIDERS
import { Page3Provider } from '../../providers/page3/page3-provider';
import { Page3ProviderMock } from '../../providers/page3/page3-provider-mock';

// CLASS BEING TESTED
import { Page3 } from './page3';

describe('Page3', () => {
  let de: DebugElement;
  let comp: Page3;
  let fixture: ComponentFixture<Page3>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Page3],
      imports: [
        IonicModule.forRoot(Page3)
      ],
      providers: [
        NavController,
        { provide: Page3Provider, useClass: Page3ProviderMock },
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page3);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.toolbar-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have the Page 3 title', () => {
    expect(de.nativeElement.innerHTML).toContain('Page Three');
  });

  it('should getItems', (done) => {
    comp.page3provider.getItems().subscribe((items) => {
      let len = items.length;
      expect(items.length).toEqual(25);
      expect(items[0].title).toEqual('Item 1');
      expect(items[len - 1].title).toEqual('Item ' + len);
      done();
    });
  });

  it('should getMoreItems', (done) => {
    comp.page3provider.getItems().subscribe((items) => {
      let len0 = items.length;
      expect(items.length).toEqual(25);
      expect(items[0].title).toEqual('Item 1');
      expect(items[len0 - 1].title).toEqual('Item ' + len0);

      comp.page3provider.getMoreItems().subscribe((items) => {
        let len1 = items.length;
        expect(items.length).toEqual(25);
        expect(items[0].title).toEqual('Item ' + (len0 + 1));
        expect(items[len1 - 1].title).toEqual('Item ' + (len0 + len1));
        done();
      });
    });
  });
});
