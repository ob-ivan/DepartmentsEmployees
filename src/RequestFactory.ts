export type Verb = 'SELECT' | 'INSERT' | 'REPLACE' | 'DELETE';

export class RequestFactory {
    public constructor(private resourceBaseUrl: string) {}
    public createRequest<T extends { id: number }>(verb: Verb, itemData?: T): Request {
        let url: string,
            method: string,
            init: boolean;
        switch (verb) {
            case 'INSERT':
                url = this.resourceBaseUrl;
                method = 'POST';
                init = true;
                break;
            case 'REPLACE':
                url = `${this.resourceBaseUrl}/${itemData.id}`;
                method = 'PUT';
                init = true;
                break;
            case 'SELECT':
                url = this.resourceBaseUrl;
                method = 'GET';
                init = false;
                break;
            case 'DELETE':
                url = `${this.resourceBaseUrl}/${itemData.id}`;
                method = 'DELETE';
                init = true;
                break;
        }
        let initArg: object[] = [];
        if (init) {
            initArg.push({
                method,
                body: JSON.stringify(itemData),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
        return new Request(url, ...initArg);
    }
}
