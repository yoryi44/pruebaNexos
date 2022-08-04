import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProducto } from '../producto.model';
import { ProductoService } from '../service/producto.service';

@Injectable({ providedIn: 'root' })
export class ProductoRoutingResolveService implements Resolve<IProducto | null> {
  constructor(protected service: ProductoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProducto | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((producto: HttpResponse<IProducto>) => {
          if (producto.body) {
            return of(producto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
