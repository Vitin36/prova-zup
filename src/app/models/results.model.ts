import { Data } from '@angular/router';

export interface Results {
    results?: Data[];
    info?: {
        seed?: String;
        results?: Number;
        page?: Number;
        version?: String;
    }
}