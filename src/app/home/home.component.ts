import { Component, Input } from '@angular/core';

import { User } from '@app/_models';
import { UrlEntries } from '@app/_models/url-entries';
import { AccountService } from '@app/_services';
import { UrlEntriesService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    @Input() Url: string;
    @Input() Expression: string;

    isTableLoading = false;
    showUrlTable = false;
    model: any = {};
    isFetching = false;
    showUrlError = false;
    user: User;
    urlEntries: UrlEntries[] = null;
    constructor(
        private accountService: AccountService,
        private urlEntriesService: UrlEntriesService) {
        this.user = this.accountService.userValue;
    }


    /**
     * Show report from Data Base
     * All the records searched and lit count.
     */
    public showReport() {
        this.isTableLoading = true;
        this.showUrlTable = true;
        this.urlEntriesService.getAllUrlEntries()
            .pipe(first())
            .subscribe(urlEntries => {
                this.urlEntries = urlEntries;
                this.isTableLoading = false;
            });
    }

    /**
     * Is the URL valid before post
     * @param userInput sting URL input
     */
    isUrlValid(userInput: string) {
        const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * Function to start the URL crawl and expression search
     */
    startCrawl() {
        if (this.isUrlValid(this.model.url)) {
            this.isFetching = true;
            this.showUrlError = false;
            this.urlEntriesService.sendUrlInformation(
                this.model.url,
                this.model.expression
            ).subscribe(fetched => {
                this.isFetching = false;
            });
        } else {
            this.showUrlError = true;
        }
    }
}
