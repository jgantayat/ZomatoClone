import { Restaurant } from "../../../core/models/restaurant";

export namespace RestaurantActions {
    export class LoadAll {
        static readonly type = '[Restaurants Page] Load All';
    }

    export class LoadOne {
        static readonly type = '[Restaurant Detail] Load One '
        constructor(public id: number) { }
    }

    export class LoadAllSucceeded {
        static readonly type = '[Restaurants API] Load All Succeeded';
        constructor(public restaurants: Restaurant[]) { }
    }

    export class LoadFailed{
        static readonly type = '[Restaurant API ] Load failed';
        constructor(public error: string){}
    }
}