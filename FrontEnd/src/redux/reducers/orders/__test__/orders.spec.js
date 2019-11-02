import reducer from '..';

const START_LOADING_ORDERS = 'START_LOADING_ORDERS';
const STOP_LOADING_ORDERS = 'STOP_LOADING_ORDERS';
const LOAD_ORDERS_DATA = 'LOAD_ORDERS_DATA';

describe('orders reducer', () => {
    describe(`when ${START_LOADING_ORDERS} action`, () => {
        it('should set isLoading to true', () => {
            const initialState = {
                isLoading: false,
            };
            const state = reducer(initialState, { type: START_LOADING_ORDERS });
            expect(state.isLoading).toBe(true);
        });
    });

    describe(`when ${STOP_LOADING_ORDERS} action`, () => {
        const initialState = {
            isLoading: true,
        };
        it('should set isLoading to false', () => {
            const state = reducer(initialState, { type: STOP_LOADING_ORDERS });
            expect(state.isLoading).toBe(false);
        });
    });

    describe(`when ${LOAD_ORDERS_DATA} action`, () => {
        it('should set the right loaded data', () => {
            const initialState = {
                orders: [],
                chartsData: {},
                isFirstTime: true,
            };
            const action = {
                type: LOAD_ORDERS_DATA,
                orders: [1, 2, 3],
                chartsData: { test: 1 },
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                orders: action.orders,
                chartsData: action.chartsData,
                isFirstTime: false,
            });
        });
    });
});
