export class Pageable {


    private _totalPages: number = 0;
    private _pageActual = 0;

    private _take: number = 0;
    private _totalRecords: number = 0;
    private _pages: number[] = [];

    constructor() {

    }

    init(take: number, totalRecords: number) {
        this._take = take;
        this._totalRecords = totalRecords;
        const pages = ((this._totalRecords / this._take));
        if (Number.isInteger(pages)) {
            this._totalPages = pages;
        } else {
            this._totalPages = Math.trunc(pages) + 1;
        }
        for (let index = 0; index < this._totalPages; index++) {
            this._pages.push(index + 1);
        }
    }


    get pageActual(): number {
        return this._pageActual;
    }

    get pages(): number[] {
        return this._pages;
    }
    get take(): number {
        return this._take;
    }

    set totalRecords(value: number) {
        this._totalRecords = value;
    }


    skipe(page: number): number {
        if (!(page < 1 || page > this._totalPages)) {
            this._pageActual = page;
            let skip = 0;
            if (page > 1) {
                skip = (page - 1) * this._take;
            }
            return skip;
        }
        return -1;
    }

}