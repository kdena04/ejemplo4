import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ejemplo4';

  //propiedades
  listaTareas:string[];
  tarea = new FormControl();

  //constructor
  constructor() {
    this.listaTareas = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      let datos = localStorage.getItem('tareas');
      if (datos != null) {
        let arregloTareas = JSON.parse(datos);
        if (arregloTareas != null) {
          for (let tarea of arregloTareas) {
            this.listaTareas.push(tarea);
          }
        }
      }
    }
  }

  agregarTarea(){
    this.listaTareas.push(this.tarea.value);
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
    this.tarea.setValue('');
  }

  borrarTarea(posicion:number){
    this.listaTareas.splice(posicion,1);
    localStorage.clear();
    localStorage.setItem('tareas',JSON.stringify(this.listaTareas))
  }

  borrarTareas(){
    localStorage.clear();
    this.listaTareas= [];
  }
}
