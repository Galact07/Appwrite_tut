"use client"

import React,{useState,FormEvent} from 'react'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const router= useRouter();
    const [userData,setUserData]= useState({
        name:"",
        email:"",
        password:""
    })

    const [error,setError] = useState("");

    const {setAuthCurrent}= useAuth();

    const signUp =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault;
        try{
           const user= await appwriteService.signupAccount(userData);

           if(user){
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
    <div>
        <label htmlFor='name'>
            Email
        </label>
        <input 
        className="text-black rounded-lg px-3 py-4"
        value={userData.name}
        onChange={(e)=>setUserData((prev)=>({...prev,name:e.target.value}))}
        />
    </div>
    <div>
    <label htmlFor='email'>
            Email
        </label>
        <input 
        className="text-black rounded-lg px-3 py-4"
        value={userData.email}
        onChange={(e)=>setUserData((prev)=>({...prev,email:e.target.value}))}
        />    </div>
    <div>
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