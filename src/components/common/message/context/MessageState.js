import  {useState} from "react";
import messageContext from "./messageContext";
const MessageState = (props) => {
    const [message, setMessage] = useState(null);
    const showMessage = (message)=>{
        setMessage({
            message: message.message,
            type: message.type
        });
        setTimeout(() => {
            setMessage(null)
        },1500)
    }
    return (
        <messageContext.Provider value={{message, showMessage}}>
        {props.children}
        </messageContext.Provider>
    ); 
}
export default MessageState;