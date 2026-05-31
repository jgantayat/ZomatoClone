import { Injectable } from '@angular/core';
import { Restaurant } from '../../../core/models/restaurant';
import { State}  from '@ngxs/store';

export interface RestaurantStateModel{
    list: Restaurant[],
    isLoading: boolean,
    error: string | null
}

@State<RestaurantStateModel>({
    name : 'restaurant',
    defaults: {
        list: [],
        isLoading: false,
        error: null
    }
})

@Injectable()
export class RestaurantState{}