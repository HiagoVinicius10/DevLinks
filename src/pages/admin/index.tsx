
import { BiTrash } from "react-icons/bi"
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firaseBaseConnect"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore"
import { Header } from "../../components/Header";

interface LinksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}


export function Admin() {
    const [nomeLink, setNomeLink] = useState('')
    const [urlLink, setUrlLink] = useState('')
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("create", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list = [] as LinksProps[];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                })
            })

            setLinks(list)
        })

        return () => {
            unsub();
        }

    }, [])

    function handleCadastro(e: FormEvent) {
        e.preventDefault()

        if (nomeLink === "" || urlLink === "") {
            alert("Preencha todos os campos!")
            return;
        }

        addDoc(collection(db, "links"), {
            name: nomeLink,
            url: urlLink,
            bg: backgroundColorInput,
            color: textColorInput,
            create: new Date()
        })
            .then(() => {
                setNomeLink("")
                setUrlLink("")
                console.log("CADASTRADO COM SUCESSO! ")
            })
            .catch((error) => {
                console.log("ERRO AO CADASTRAR COM SUCESSO" + error)
            })
    }

    async function handleDeleteLink( id: string ) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
     }

    return (
        <div className=" flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form onSubmit={handleCadastro} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white mb-2 mt-3 font-medium"> Nome do link </label>
                <Input
                    placeholder="Nome do seu link..."
                    type="text"
                    value={nomeLink}
                    onChange={(e) => setNomeLink(e.target.value)}
                />

                <label className="text-white mb-2 mt-8 font-medium"> URL do link </label>
                <Input
                    placeholder="Digite a url..."
                    type="text"
                    value={urlLink}
                    onChange={(e) => setUrlLink(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className=" flex gap-3 items-center ">
                        <label className="text-white mb-2 mt-2 font-medium"> Fundo do link </label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div className=" flex gap-3 items-center">
                        <label className="text-white mb-2 mt-2 font-medium"> Cor do link </label>
                        <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nomeLink !== "" && (
                    <div className="flex flex-col justify-around items-center mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white mb-3 mt-2 font-medium"> Veja como esta ficando:</label>
                        <article
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-1"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
                        >
                            <p style={{ color: textColorInput }}> {nomeLink} </p>
                        </article>
                    </div>
                )}

                <button type="submit" className="bg-blue-600 text-white h-9 rounded-md mb-7 font-medium flex justify-center items-center gap-4 cursor-pointer ">
                    Cadastrar
                </button>

            </form>

            <h2 className="text-4xl text-white font-bold mb-4 flex flex-col  items-center"> Meus links </h2>

            {links.map((link) => (
                <article 
                key={link.id}
                className="flex items-center justify-between w-11/12 max-w-xl py-4 px-2 mb-2 rounded-md  " style={{ backgroundColor: link.bg, color: link.color }}>

                <p className="font-semibold text-lg" > {link.name} </p>
                
                <div>
                    <button onClick={ () => handleDeleteLink(link.id)} className="cursor-pointer border outline-dashed p-1 rounded bg-neutral-900 transition-transform hover:scale-110">
                        <BiTrash size={20} color="#fff" />
                    </button>
                </div>
            </article>
            ))}
        </div>
    )
}