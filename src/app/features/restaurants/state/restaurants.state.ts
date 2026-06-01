import { Restaurant } from './../../../core/models/restaurant';
import { RestaurantActions } from './restaurants.actions';
import { RestaurantService } from './../../../core/services/restaurant';
import { inject, Injectable } from '@angular/core';
import { State, Action,StateContext } from '@ngxs/store';
import { catchError, of, tap, throwError } from 'rxjs';

export interface RestaurantStateModel {
    list: Restaurant[],
    selected: Restaurant | null
    isLoading: boolean,
    error: string | null
}

@State<RestaurantStateModel>({
    name: 'restaurant',
    defaults: {
        list: [],
        selected: null,
        isLoading: false,
        error: null
    }
})

@Injectable()
export class RestaurantState {

    private RestaurantService = inject(RestaurantService);

    @Action(RestaurantActions.LoadAll)
    loadAll(ctx: StateContext<RestaurantStateModel>) {
        ctx.patchState({
            isLoading: true,
            error: null
        });

        return this.RestaurantService.getAllRestaurants()
            .pipe(
                tap(restaurant => {
                    const freshRestaurantList = ctx.getState();
                    ctx.setState({ ...freshRestaurantList, list: restaurant, isLoading: false })
                }),
                catchError(err => {
                    ctx.patchState({ isLoading: false, error: err.message ?? 'Failed' });
                    return of([]);
                })
            )
    }
}

