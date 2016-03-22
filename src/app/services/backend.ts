import {Injectable} from 'angular2/core';
import {Http, Request, Response, RequestMethod, RequestOptions, RequestOptionsArgs} from 'angular2/http';
import {Router} from 'angular2/router';
import {Subject, Observable, ConnectableObservable} from 'rxjs/Rx';

interface RequestAction {
    req:Request;
    type:string;
}

@Injectable()
export class BackendService {
    pendingRequestCount:Observable<number>;
    private pendingRequests:ConnectableObservable<Request[]>;
    private requestActions:Subject<RequestAction> = new Subject<RequestAction>();

    constructor(public http:Http, private router:Router) {
        this.pendingRequests = this.requestActions.scan((requests, action) => {
            if (action.type === 'start') {
                return requests.concat([action.req]);
            }
            return requests.filter(req => req !== action.req);
        }, []).publish();

        this.pendingRequestCount = this.pendingRequests
            .map(requests => requests.length)
            .startWith(0);

        this.pendingRequests.connect();
    }

    get(endpoint, options?:RequestOptionsArgs) {

        let args:RequestOptions = new RequestOptions({
            url: endpoint,
            method: RequestMethod.Get
        });

        if (options) {
            args = args.merge(options);
        }

        let res:Observable<Response> = this.request(new Request(args));

        let errCatcher = (err:Response) => {
            if (err.status === 401) {
                return Observable.throw(err.json().error || 'Unauthorized');
            } else {
                return Observable.throw(err.json().error || 'Server error');
            }
        };

        return res.map(res => res.json()).catch(errCatcher);
    }

    private request(req:Request) {
        return Observable.of(req)
            .do(req => this.requestActions.next({type: 'start', req}))
            .flatMap(req => this.http.request(req))
            .finally(() => this.requestActions.next({type: 'complete', req}));
    }
}
