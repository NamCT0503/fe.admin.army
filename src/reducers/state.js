export const initStateReducer = {
    isShowViewNoti: false
}

export const stateReducer = (state, action) => {
    switch(action.type){
        case 'LOAD_STATE':
            return initStateReducer;

        case 'OPEN_VIEW_NOTI':
            return { ...state, isShowViewNoti: true };

        case 'CLOSE_VIEW_NOTI':
            return { ...state, isShowViewNoti: false };
        
        default:
            return state;
    }
}