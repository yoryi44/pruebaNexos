import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ProductoFormService, ProductoFormGroup } from './producto-form.service';
import { IProducto } from '../producto.model';
import { ProductoService } from '../service/producto.service';
import { AlertService } from 'app/core/util/alert.service';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;
  account: Account | null = null;
  producto: IProducto | null = null;

  editForm: ProductoFormGroup = this.productoFormService.createProductoFormGroup();
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    protected productoService: ProductoService,
    protected productoFormService: ProductoFormService,
    protected activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService
    .getAuthenticationState()
    .pipe(takeUntil(this.destroy$))
    .subscribe(account => (this.account = account));

    this.activatedRoute.data.subscribe(({ producto }) => {
      this.producto = producto;
      if (producto) {
        this.updateForm(producto);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.productoFormService.getProducto(this.editForm);
    const fechaSistema = new Date();
    if(producto.fechaIngreso?.isAfter(fechaSistema)){
      this.alertService.addAlert({
        type: 'warning',
        message: 'La fecha ingreso no puede ser superior a la fecha sistema',
      });
      return;
    }
    if (producto.id !== null) {
      producto.usuarioModificacion = this.account?.login;
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      producto.usuarioCreacion = this.account?.login;
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }


  validarNombreProducto(): void {
    this.isSaving = true;
    const producto = this.productoFormService.getProducto(this.editForm);
      //se valida el rut
      this.productoService.validateName(producto.nombre!).subscribe(
        (res: HttpResponse<number>) => {
          if(res.body === 0){
            this.save();
          }
          else {
            this.isSaving = false;
            this.alertService.addAlert({
              type: 'warning',
              message: 'Un producto con este nombre ya se encuentra registrado',
            });
          }
        },
        () => {
          this.isSaving = false;
          this.alertService.addAlert({
            type: 'warning',
            message: 'Un producto con este nombre ya se encuentra registrado',
          });
        }
      );
    
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(producto: IProducto): void {
    this.producto = producto;
    this.productoFormService.resetForm(this.editForm, producto);
  }
}
