/**
 * Created by: leaf
 * Date: 22/10/16
 * Time: 22:08
 */

import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../data/city.model";
import {ModalDirective} from "ng2-bootstrap";
import {MultiplayerService} from "../../services/multiplayer.service";
import {ToastsManager} from "ng2-toastr";
import {Game} from "../../data/game.model";

@Component({
    moduleId: module.id,
    selector: 'city',
    templateUrl: 'game-city.component.html'
})

export class GameCityComponent implements OnInit, OnDestroy {

    city: City;
    game: Game;
    tries: number;
    solved: boolean;
    userJoin: any;
    userLeft: any;
    gamesConn: any;
    currentuser: string;
    displayPhoto: string;
    hints: number;

    @ViewChild('smModal')
    public bsModal: ModalDirective;

    constructor(private route: ActivatedRoute,
                private citiesService: CitiesService,
                private multiplayerService: MultiplayerService,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.tries = 3;
        this.hints = 0;
        this.solved = false;

        this.route.params.forEach((params: Params) => {
            this.citiesService.getGame(params['id'])
                .subscribe(game => {
                    this.game = game;
                    this.city = game.city;
                    this.constructPhotosPath();
                    this.displayPhoto = game.city.photos[0];
                });
            this.currentuser = params['username'];
        });

        this.userJoin = this.multiplayerService.userJoin().subscribe(user => {
            this.game.users.push(user);
            this.toastr.info('Новая фигура в игре - ' + user, 'У нас новый игрок!');
        });

        this.userLeft = this.multiplayerService.userLeft().subscribe(user => {
            if (user === this.game.host) {
                this.toastr.warning('Создатель игры ' + user + ' вышел из игры из игры', 'Игра Окончена');
                this.game = null;
                this.city = null;
            }
            else {
                this.game.users.splice(this.game.users.indexOf(user), 1);
                this.toastr.warning('Игрок ' + user + ' покидает игру', 'Нас стало меньше!');
            }
        });

        this.gamesConn = this.multiplayerService.gameResults().subscribe(data => {
            this.endGame(data);
        });
    }

    private endGame(data): void {
        debugger;
        if (data.result && data.user != this.currentuser) {
            this.toastr.warning('Игрок ' + data.user + ' выиграл', 'Игра окончена');
        }
        else {
            this.toastr.warning('Игрок ' + data.user + ' выбывает из игры', 'Обновление игроков');
        }
        this.showChildModal();
    }

    ngOnDestroy() {
        let self = this;

        this.multiplayerService.leavingGame({
            game_id: this.game._id,
            user: this.currentuser
        }, function () {
            self.userLeft.unsubscribe();
            self.userJoin.unsubscribe();
            self.gamesConn.unsubscribe();
        });

    }

    private constructPhotosPath(): void {
        this.city.photos.forEach((photo, index) =>
            this.city.photos[index] = this.city.path + '/' + photo);
    }

    guestCity(e, guess: HTMLInputElement): void {
        e.preventDefault();
        let self = this;
        //Remove all punc from user guess and city name
        if (GameCityComponent.removePunct(guess.value) ===
            GameCityComponent.removePunct(this.city.name)) {
            self.solved = true;

            this.multiplayerService.gameCompleted({
                game_id: self.game._id,
                user: this.currentuser,
                result: true
            }, function () {
                self.toastr.success('Вы выиграли', 'Игра окончена');
            });
        } else {
            this.toastr.error('Спробуйте ще. Осталось ' + (this.tries - 1), 'Неправильно');
        }

        guess.value = '';
        this.tries -= 1;

        if (this.tries <= 0) {
            this.multiplayerService.gameCompleted({
                game_id: self.game._id,
                user: this.currentuser,
                result: false
            }, function () {
                self.toastr.error('Вы проиграли. Но всегда можно попробовать снова', 'Игра окончена');
                self.showChildModal();
            });

        }
    }

    private static removePunct(value: string): string {
        value = value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s{2,}/g, " ").toLowerCase();
        return value;
    }

    public showChildModal(): void {
        this.bsModal.show();
    }

    public hideChildModal(): void {
        this.bsModal.hide();
    }

    public showNextPhoto() {
        this.hints += 1;
        let index = this.city.photos.length > this.hints
            ? this.hints : this.hints % this.city.photos.length;
        this.displayPhoto = this.city.photos[index];
    }
}