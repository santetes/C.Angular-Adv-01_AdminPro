import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  retry,
  interval,
  take,
  map,
  filter,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSub!: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe({
    //     next: (value) => console.log(value),
    //     error: (err) => console.warn(err),
    //     complete: () => console.log('tarea Completada'),
    //   });
    this.intervalSub = this.retornaIntervalo().subscribe((val) =>
      console.log(val)
    );
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  retornaIntervalo() {
    const interval$ = interval(500).pipe(
      map((val) => val + 1),
      filter((val) => val % 2 == 0)
    );
    return interval$;
  }

  retornaObservable() {
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        ++i;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          i++;
          observer.error('algo salió mal');
        }
      }, 1000);
    });

    return obs$;
  }
}
