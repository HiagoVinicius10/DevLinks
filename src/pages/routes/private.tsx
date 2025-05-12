
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../services/firaseBaseConnect";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router";

interface PrivateProps {
children: ReactNode
}

export function Private({children}: PrivateProps) {
    const [ loading, setLoagind] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
     const unsub = onAuthStateChanged(auth, (user)=> {
        if(user){
            const userData = {
                uid: user?.uid,
                email: user?.email
            }

            localStorage.setItem("@ReactLinks", JSON.stringify(userData))
            setLoagind(false)
            setSigned(true)
        }else{
            setLoagind(false);
            setSigned(false);
        }
     })  
     
     return () =>{
        unsub()
     }
    }, [])

    

    if(loading){
        return <div className="flex justify-center pt-8 min-h-screen text-4xl italic px-2 text-white"> Carregando.... </div>
    }

    if(!signed){
     return <Navigate to="/login"/>
    }

    return children 
}