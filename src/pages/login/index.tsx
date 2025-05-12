import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Input } from '../../components/input'
import { auth } from "../../services/firaseBaseConnect"
import { signInWithEmailAndPassword } from 'firebase/auth'


export function Login () {
    const [email,  setEmail]= useState('')
    const [password,  setPassWord]= useState('')
    const navigate = useNavigate()

    function handleForm(e: FormEvent){
        e.preventDefault()

        if(email === "" || password === ''){
          alert("Preencha todos os campos!")
          return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("LOGADO COM SUCESSO!")
          navigate("/admin", {replace: true})
        })
        .catch((error) => {
          console.log("ERRO AO FAZER LOGIN: ")
          console.log(error);
        })
    }

    return(
    <div className='flex w-full h-screen  items-center justify-center flex-col '>
      <Link to="/"> 
        <h1 className='mt-11 mb-7 text-white font-bold text-6xl'> Dev
            <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>Link</span></h1>
      </Link>

    <form className='w-full max-w-xl flex flex-col px-2' onSubmit={handleForm}>
      <Input
      type='email'
      placeholder='Digite seu Email...'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <Input
      type='password'
      placeholder='**********'
      value={password}
      onChange={(e) => setPassWord(e.target.value)}
      />
      <button 
      type='submit'
      className='bg-blue-600 h-9 border-0 text-lg font-medium rounded-md text-white cursor-pointer transition-transform hover:scale-103'>
        Acessar
      </button>

    </form>

    </div>
    )
}