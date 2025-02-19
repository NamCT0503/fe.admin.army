export const WS_HOST = 'ws://localhost:5001';

export const sendMessage = (websocket, data, type) => {
    const { invite_id, suggesstion_id }= data;
    if(websocket && invite_id){
        websocket.send(JSON.stringify({
            type,
            suggesstion_id
        }))
    }
}