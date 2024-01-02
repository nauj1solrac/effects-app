import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions";
import { catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { EMPTY, of } from "rxjs";

@Injectable()
export class UsuariosEffects{
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ){}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
        ofType( usuariosActions.cargarUsuarios),
        exhaustMap(
          () => this.usuarioService.getUsers()
            .pipe(
              map(users => usuariosActions.cargarUsuariosSuccess({usuario: users})),
              catchError(err => of(usuariosActions.cargarUsuariosError({payload: err})))
            )
        )
    )
  );
}
