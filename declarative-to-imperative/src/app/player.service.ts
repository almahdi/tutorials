import { Injectable } from '@angular/core';
import { interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  names = [
    {
      id: 0,
      name: 'Blackburn',
    },
    {
      id: 1,
      name: 'Montgomery',
    },
    {
      id: 2,
      name: 'Hilary',
    },
    {
      id: 3,
      name: 'Fletcher',
    },
    {
      id: 4,
      name: 'Massey',
    },
    {
      id: 5,
      name: 'Kathleen',
    },
    {
      id: 6,
      name: 'Dana',
    },
  ];
  newPlayers$ = interval(10000).pipe(
    map((index) => this.names[index % this.names.length])
  );
}
