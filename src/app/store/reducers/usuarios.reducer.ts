import { createReducer, on } from "@ngrx/store";
import {cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError} from '../actions';
import { Usuario } from "src/app/models/usuario.model";

export interface UsuariosState{
  users: Usuario[],
  loaded: boolean,
  loading: boolean,
  error: any
}

export const usuariosInitialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
 }

const _usuariosReducer = createReducer(
  usuariosInitialState,
  on(cargarUsuarios, state => ({...state, loading: true})),
  on(cargarUsuariosSuccess, (state, {usuario}) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...usuario]
  })),
  on(cargarUsuariosError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
)

export function usuarioReducer(state: any, action: any){
  return _usuariosReducer(state, action);
}
