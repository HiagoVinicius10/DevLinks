import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/input"

import { db } from "../../services/firaseBaseConnect"
import { 
    doc,
    setDoc,
    getDoc
 } from "firebase/firestore"

export function NetWorks () {
    const [faceInput, setFaceinput] = useState("")
    const [instaInput, setInstaInput] = useState("")
    const [youtubeInput, setYoutubeInput] = useState("")

    useEffect(() => {
        function loading () {
          const docRef = doc(db, "social", "link")
          getDoc(docRef)
          .then((snapshot) => {
            if(snapshot.data() !== undefined){
            setFaceinput(snapshot.data()?.facebook)
            setInstaInput(snapshot.data()?.instagram)
            setYoutubeInput(snapshot.data()?.youtubeInput)
            }
          })  
          .catch((error) => {
            return error
          })
        }

        loading()
    },[])

    function handleSalveLink(e: FormEvent){
       e.preventDefault()

       setDoc(doc(db, "social", "link"), {
        facebook: faceInput,
        instagram: instaInput,
        youtubeInput: youtubeInput
       })
       .then(() => {
        console.log("CADASTRADO COM SUCESSO!!")
       })
       .catch((error) => {
        console.log("ERRO AO SALVAR" + error)
       })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2 ">
            <Header/>
            <h1 className="text-white text-4xl font-medium mt-8 mb-4"> Minhas redes sociais </h1>


        <form onSubmit={handleSalveLink} className="flex flex-col max-w-xl w-full">  
        <label className=" text-white font-medium mt-2 mb-2"> Link facebook</label>
            <Input
            type="url"
            placeholder="Digite a url do facebook..."
            value={faceInput}
            onChange={(e) => setFaceinput(e.target.value)}
            />

        <label className=" text-white font-medium mt-2 mb-2"> Link instagram</label>
            <Input
            type="url"
            placeholder="Digite a url do instagram..."
            value={instaInput}
            onChange={(e) => setInstaInput(e.target.value)}
            />

        <label className=" text-white font-medium mt-2 mb-2"> Link Youtube</label>
            <Input
            type="url"
            placeholder="Digite a url do Youtube..."
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            />

            <button 
            className="text-white bg-blue-600 h-10 rounded-md transition-transform hover:scale-105 cursor-pointer mb-7 font-bold"
            type="submit"> 
            Salvar links  </button>
            
        </form>
        </div>
    )
}