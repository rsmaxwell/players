﻿import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/dump/service/message.service';


import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];

    alertSubscription: Subscription | undefined;
    routeSubscription: Subscription | undefined;

    message!: any;
    errorSubscription: Subscription | undefined;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });

        this.errorSubscription = this.messageService.currentMessage.subscribe(message => this.message = message)
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
        this.errorSubscription?.unsubscribe();
    }

    showDetails(alert: Alert) {
        console.log("AlertsComponent.onClick")
        if (alert.dump) {
            this.router.navigate(['/error']);            
            this.messageService.changeMessage(alert.dump);
        }
        else {
            console.log("alert has no detail")
        }
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            this.alerts.find(x => x === alert)!.fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }

        classes.push(alertTypeClass[alert.type!]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}