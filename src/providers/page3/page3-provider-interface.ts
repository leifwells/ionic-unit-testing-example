import { Observable } from 'rxjs';
import { Page3Item } from './page3-item';

export interface Page3ProviderInterface {
  getItems: () => Observable<Page3Item[]>;
  getMoreItems: () => Observable<Page3Item[]>;
}
