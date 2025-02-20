import ChatContentJSX from "./ChatContent";
import MenuChatJSX from "./Menu";

const ChatJSX = () => {
    return(
        <div className="" style={{
            border: '1px solid black',
            height: '100vh',
            width: '100vw',
            display: 'grid',
            gridTemplateAreas: `'menu chat'`,
            gridTemplateColumns: '250px 1fr',
            // overflow: 'hidden'
        }}>
            <MenuChatJSX />
            <ChatContentJSX />
        </div>
    )
}

export default ChatJSX;