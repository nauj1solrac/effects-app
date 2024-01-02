import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions";
import { catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { EMPTY, of } from "rxjs";

@Injectable()
export class UsuarioEffects{
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ){}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
        ofType( usuariosActions.cargarUsuario),
        exhaustMap(
          (action) => this.usuarioService.getUsersById(action.id)
            .pipe(
              map(user => usuariosActions.cargarUsuarioSuccess({usuario: user})),
              catchError(err => of(usuariosActions.cargarUsuarioError({payload: err})))
            )
        )
    )
  );
}
