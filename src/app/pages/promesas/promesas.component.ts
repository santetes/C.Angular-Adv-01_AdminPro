import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((data) => console.log(data));
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=1')
        .then((resp) => resp.json().then((body) => resolve(body.data)))
        .catch((err) => reject('algo salió mal :('));
    });
  }
}
