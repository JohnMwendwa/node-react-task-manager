import React,{createContext,useRef,useState} from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props){ 
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [msg,setMsg] = useState('');
    const mounted = useRef(true);
    const [updated,setUpdated] = useState(false)

    const handleToken =()=>{
        setToken(localStorage.setItem('token',''))
    }

    return (
        <TaskContext.Provider value={{token,handleToken,msg,setMsg,mounted,updated,setUpdated}}>
            {props.children}
        </TaskContext.Provider>
    )
   
}