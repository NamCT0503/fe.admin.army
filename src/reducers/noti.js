export const initNotiReducer = {
    items: [],
    no_read: 0
}

export const notiReducer = (state, action) => {
    switch(action.type){
        case 'LOAD_NOTI':
            const updateItems = [...action?.payload?.items];
            const notiNoRead = updateItems.filter(notis => notis.is_read!==true);
            return { ...state, items: updateItems, no_read: notiNoRead.length }

        case 'READ_NOTI':
            const arrReadNoti = [...action?.payload?.items];
            arrReadNoti.map(notis => {
                if(notis.id===action?.payload?.noti_id){
                    notis.is_read = true
                }
            });
            const notiNotRead = arrReadNoti.filter(notis => notis.is_read!==true);
            return { ...state, items: updateItems, no_read: notiNotRead.length }
        
        default:
            return state;
    }
}