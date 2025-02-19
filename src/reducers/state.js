export const initStateReducer = {
    isShowViewNoti: false,
    isOpenQuickMessage: false
}

export const stateReducer = (state, action) => {
    switch(action.type){
        case 'LOAD_STATE':
            return initStateReducer;

        case 'OPEN_VIEW_NOTI':
            return { ...state, isShowViewNoti: true };

        case 'CLOSE_VIEW_NOTI':
            return { ...state, isShowViewNoti: false };

        case 'OPEN_QUICK_MESSAGE':
            return { ...state, isOpenQuickMessage: true };

        case 'CLOSE_QUICK_MESSAGE':
            return { ...state,isOpenQuickMessage: false };
        
        default:
            return state;
    }
}