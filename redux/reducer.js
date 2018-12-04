import Actions from './action';
export default function (state, action) {
    switch (action.type) {
        case Actions.getList.type:
            return Object.assign({}, state, { isFetching: true });
        case Actions.getList_OK.type:
            return Object.assign({}, state, { goodsList: action.response, isFetching: false });
        case Actions.getList_FALL.type:
            return Object.assign({}, state, { isFetching: false });
        default:
            return Object.assign({}, state);
    }
}