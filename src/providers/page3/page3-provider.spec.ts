// FOR TESTING
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

// PROVIDER CLASSES AND MOCKS
import { HttpModule } from '@angular/http';
import { Page3HttpProvider } from './page3-http-provider';
import { Page3HttpProviderMock } from './page3-http-provider-mock';

// PROVIDER BEING TESTED
import { Page3Provider } from './page3-provider';

describe('Page3 Provider', () => {
  let provider: Page3Provider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule
      ],
      providers: [
        { provide: 'Page3HttpProvider', useClass: Page3HttpProviderMock },
        Page3Provider
      ]
    });
  }));

  // INJECT THE PROVIDER SO IT CAN BE TESTED
  beforeEach(inject([Page3Provider], (prov) => {
    provider = prov;
  }));

  it('should create provider', () => {
    expect(provider).toBeDefined()
    expect(provider instanceof Page3Provider).toBeTruthy();
  });

  it('should getItems', (done) => {
    provider.getItems().subscribe((items) => {
      let len = items.length;
      expect(items.length).toEqual(25);
      expect(items[0].title).toEqual('Item 1');
      expect(items[len - 1].title).toEqual('Item ' + len);
      done();
    });
  });

  it('should getMoreItems', (done) => {
    provider.getItems().subscribe((items) => {
      let len0 = items.length;
      expect(items.length).toEqual(25);

      provider.getMoreItems().subscribe((items) => {
        let len1 = items.length;
        expect(items.length).toEqual(50);
        expect(items[len0].title).toEqual('Item ' + (len0 + 1));
        expect(items[len1 - 1].title).toEqual('Item ' + len1);
        done();
      });
    });
  });
});
