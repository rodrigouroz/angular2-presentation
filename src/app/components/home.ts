import {Component} from 'angular2/core';
import {Grid} from './grid/grid';
import {Content} from '../models/content';
import {Column} from './grid/column';
import {BackendService} from '../services/backend';
import {DatePipe} from 'angular2/common';

@Component({
    templateUrl: 'assets/views/home.html',
    directives: [Grid]
})
export class HomeComponent {

    contents:Array<Content>;
    columns:Array<Column>;
    baseUrl:string = 'https://testapi.vsko.be/content?typeIn=CURRICULUM_ZILL%2CCURRICULUM_ZILL_DEVELOPMENT_CLUSTER%2CCURRICULUM_ZILL_DEVELOPMENT_FIELD%2CCURRICULUM_ZILL_DEVELOPMENT_THEME%2CCURRICULUM_ZILL_GENERIC_DEVELOPMENT_GOAL%2CCURRICULUM_ZILL_DEVELOPMENT_CONTENT%2CCURRICULUM_ZILL_LEERLIJN_PRE_REFERENCE%2CCURRICULUM_ZILL_LEERLIJN_CLUSTER%2CCURRICULUM_ZILL_LEERLIJN_POST_REFERENCE%2CCONTENT_GROUP';

    constructor(private backend:BackendService) {
        this.columns = [
            new Column('title', 'Title'),
            new Column('description', 'Description'),
            //new Column('modified', 'Modified')
        ];

        this.contents = [];
    }

    search(title) {
        this.fetch(title);
    }

    list() {
        this.fetch();
    }

    onAction(content: Content) {
        window.open('https://testapi.vsko.be' + content.url);
    }

    private fetch(title?:string) {
        let url = this.baseUrl + (title ? '&titleContains=' + title : null);
        this.backend.get(url)
            .map((contents:any) => {
                let results:Array<Content> = [];
                let content:Content;
                if (contents) {
                    contents.results.forEach((result) => {
                        content = new Content();
                        content.url = result.$$expanded.$$meta.permalink;
                        content.title = result.$$expanded.title;
                        content.description = result.$$expanded.description;
                        //content.modified = new DatePipe().transform(new Date(result.$$expanded.modified), ['medium']);
                        results.push(content);
                    });
                }
                return results;
            })
            .subscribe(results => this.contents = results);
    }

}
