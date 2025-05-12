import { Social } from "../../components/Social"
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa"
import { useEffect, useState } from "react"
import { db } from "../../services/firaseBaseConnect"
import { 
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
 } from "firebase/firestore"

 interface LinksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebool: string;
    instagram: string;
    youtube: string;
}

export function Home () {
    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLink(){
         const linkRef = collection(db, "links")
         const queryRef = query(linkRef, orderBy("create", "asc"))

         getDocs(queryRef)
         .then((snapshot) => {
            const list = [] as LinksProps[];

            snapshot.forEach((doc) =>{
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(list)
         })

        }
        loadLink()
    },[])

    useEffect(() => {
       function loadSocialLinks(){
        const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
          if(snapshot.data() !== undefined) {
            setSocialLinks({
                facebool: snapshot.data()?.facebook,
                instagram: snapshot.data()?.instagram,
                youtube: snapshot.data()?.youtubeInput,
            })
          }
        })
       }

       loadSocialLinks()
    },[])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className=" md:text-4xl text-3xl font-bold text-white mt-20"> Hiago Vinicius </h1>
            <p className="text-gray-50 mb-5 mt-5"> Veja meus links 👇🏾</p>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((item) => (
                    <section
                    style={{ backgroundColor: item.bg}}
                    key={item.id}
                     className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a href={item.url} target="_blank">
                        <p 
                        style={{ color: item.color}}
                        className="text-base md:text-lg">
                            {item.name}
                        </p>
                    </a>
                </section>
                ))}

               {socialLinks && Object.keys(socialLinks).length > 0 && (
                 <footer className="flex justify-center gap-3 my-4">
                 <Social url={socialLinks.facebool}>
                     <FaLinkedinIn size={35} color="#fff"/>
                 </Social>

                 <Social url={socialLinks.instagram}>
                     <FaInstagram size={35} color="#fff"/>
                 </Social>

                 <Social url={socialLinks.youtube}>
                     <FaYoutube size={35} color="#fff"/>
                 </Social>
             </footer>
               )}
            </main>

        </div>
    )
}