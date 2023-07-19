import {config} from '@/config/config'
import {Client,Account,ID} from 'appwrite'

const appwriteClient=new Client();
appwriteClient.setEndpoint(config.apiEndPointURL).setProject(config.appwriteProjectID);

type SignUpAccount={
    name:string,
    email:string,
    password:string
}

type LoginAccount={
    email:string,
    password:string
}

const account= new Account(appwriteClient);

export class AppwriteAccount{
    //create a method to create a account
     async signupAccount({name,email,password}:SignUpAccount){
        return await account.create(ID.unique(),name,email,password);
    }

     async loginAccount({email,password}:LoginAccount){
        return await account.createEmailSession(email,password);
    }

     async getAccount(){
        return await account.get();
    }

    // static async deleteAccount(){
    //     return await account.delete();
    // }

    // static async updateAccount(name:string){
    //     return await account.update(name);
    // }

     async loggedIn(){
        const user = await  this.getAccount();
        return Boolean(user);
    }

     async logoutAccount(){
        return await account.deleteSession('current');
    }

     async getAccountID(){
        return await account.get().then((response)=>{
            return response.$id;
        });
    }
}

const appwriteService = new AppwriteAccount();

export default appwriteService;