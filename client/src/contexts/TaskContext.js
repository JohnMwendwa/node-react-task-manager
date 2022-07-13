import React,{createContext,useRef,useState} from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props){ 
    const getToken =()=>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString || null);
        return userToken;
    }

    const [token,setToken] = useState(getToken());
    const [msg,setMsg] = useState('');
    const mounted = useRef(true);
    const [updated,setUpdated] = useState(false)

    const saveToken =(userToken)=>{
        let token;
        if(!userToken.length){
            token = ''
        }else{
            const b = 'Bearer ';
            token = b.concat(userToken)
        }
        return setToken(localStorage.setItem('token', JSON.stringify(token)
        ));
     }
    return (
        <TaskContext.Provider value={{msg,setMsg,mounted,updated,setUpdated,token,setToken:saveToken}}>
            {props.children}
        </TaskContext.Provider>
    )
   
}