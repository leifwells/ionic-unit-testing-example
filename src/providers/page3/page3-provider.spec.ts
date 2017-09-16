// FOR TESTING
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

// PROVIDER CLASSES AND MOCKS
import { HttpModule } from '@angular/http';

// PROVIDER BEING TESTED
import { Page3Provider } from './page3-provider';

describe('Page3', () => {
  let provider: Page3Provider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule
      ],
      providers: [
        Page3Provider
      ]
    });
  }));

  // INJECT THE PROVIDER SO IT CAN BE TESTED
  beforeEach(inject([Page3Provider], (prov) => {
    provider = prov;
  }));

  it('should create component', () => {
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
        expect(items.length).toEqual(25);
        expect(items[0].title).toEqual('Item ' + (len0 + 1));
        expect(items[len1 - 1].title).toEqual('Item ' + (len0 + len1));
        done();
      });
    });
  });
});
