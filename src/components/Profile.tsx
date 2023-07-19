"use client"

import React,{useState,useEffect} from 'react'
import { Models } from 'appwrite'
import appwriteService from '@/appwrite/config'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'

export const  Profile=()=>{
    const [userData,setUserData]= useState<Models.User<Models.Preferences>|null>(null);
    const [error,setError] = useState("");
    const {setAuthCurrent}= useAuth();
    const router= useRouter();

    const getUser=async()=>{
        try{
            const user= await appwriteService.getAccount();
            setUserData(user);
        }catch(err:any){
            setError(err);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <div>
            {userData &&
            <main className='w-full h-screen'>
                <div className="flex flex-col justify-center items-center">
                    <h1>{userData.name}</h1>
                    <h2>{userData.email}</h2>
                    <button onClick={async()=>{
                        await appwriteService.logoutAccount();
                        setAuthCurrent(false);
                        router.push('/login');
                    }}>Logout</button>
                </div>
            </main>
            }
        </div>
    )
}