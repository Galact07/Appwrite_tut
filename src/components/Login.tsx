"use client"

import React,{useState,FormEvent} from 'react'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const router= useRouter();
    const [userData,setUserData]= useState({
        email:"",
        password:""
    })

    const [error,setError] = useState("");

    const {setAuthCurrent}= useAuth();

    const signUp =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault;
        try{
           const session= await appwriteService.loginAccount(userData);

           if(session){
            setAuthCurrent(true);
            router.push('/profile')
           }
        }catch(err:any){
            setError(err);
        }
    }

  return (
   //create a form to ask user for name,email,password in tailwind
   <main className='w-full h-screen flex flex-col justify-center items-center'>
    <div className="flex flex-col justify-center items-center">
    <label htmlFor='email'>
            Email
        </label>
        <input 
        className="text-black rounded-lg px-3 py-4"
        value={userData.email}
        onChange={(e)=>setUserData((prev)=>({...prev,email:e.target.value}))}
        />    </div>
    <div className="flex flex-col justify-center items-center">
    <label htmlFor='password'>
            Email
        </label>
        <input 
        className="text-black rounded-lg px-3 py-4"
        value={userData.password}
        onChange={(e)=>setUserData((prev)=>({...prev,password:e.target.value}))}
        />    
        </div>
        <button type='submit' className="px-5 py-4" >Submit</button>
   </main>
  )
}

export default SignUp