import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { PlayersService } from './player.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> The Game </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>You just lost</p>
      <p>Player {{ playersService.newPlayers$ | async | json }}</p>
    </ion-content>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public playersService: PlayersService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.playersService.newPlayers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (newPlayer) => {
        const alert = await this.alertCtrl.create({
          message: `A new challenger '${newPlayer.name}' appears. Player ID: '${newPlayer.id}'`,
        });
        alert.present();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
