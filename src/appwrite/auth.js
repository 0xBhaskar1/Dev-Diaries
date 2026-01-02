import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

class AuthService {
    client = new Client();
    account
    
    constructor() {
        
        this.client.setEndpoint(config.appwriteURL);
        this.client.setProject(config.projectID);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            if (user) {
                return this.login({ email, password })
            } else {
                return user
            }
        } catch (error) {
            console.log("Appwrite service ::  createAccount :: error", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            const result = await this.account.createEmailPasswordSession({
                email: email,
                password: password

            }); 
            return result
        } catch (error) {
            console.log("Appwrite service ::  login :: error", error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("EROOR GETTING CURRENT USER",error);
        }
        return null
    }
    
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("APPWRITE ERROR : CANNOT LOGOUT",error);
            throw error
        }
    }
}
const authService = new AuthService();
export default authService;