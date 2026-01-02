import config from "../config/config";
import { Client, ID, Query, Storage, TablesDB } from "appwrite";

class databaseService {
    client = new Client();
    tablesDB
    bucket
    constructor (){
        this.client.setEndpoint(config.appwriteURL);
        this.client.setProject(config.projectID);
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userID,owner,category}){
        try {
            return await this.tablesDB.createRow({ databaseId: config.databaseID,
                tableId: config.tableID,
                rowId: slug,
                data: {
                    "title": title,
                    "content": content,
                    "featuredImage": featuredImage,
                    "status": status,
                    "userID": userID,
                    "owner" : owner,
                    "category" : category
                }})
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error
        }
    }

    async updatePost(slug,{ title, content, featuredImage, status, userID,owner,category,likes }){
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.databaseID,
                tableId: config.tableID,
                rowId: slug,
                data: {
                    "title": title,
                    "content": content,
                    "featuredImage": featuredImage,
                    "status": status,
                    "userID": userID,
                    "owner" : owner,
                    "category" : category,
                    "likes" : likes
                },

            });
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async getPost(slug){
         try {
            return await this.tablesDB.getRow({
                databaseId: config.databaseID,
                tableId: config.tableID,
                rowId: slug,
                queries: [], // optional

            });
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    async deletePost(slug){
        try {
                await this.tablesDB.deleteRow({
                databaseId: config.databaseID,
                tableId: config.tableID,
                rowId: slug,

            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            const result = await this.tablesDB.listRows({
                databaseId: config.databaseID,
                tableId: config.tableID,
                queries: queries, // optional

            });
            return result;
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){
         try {
            const result = await this.bucket.createFile({
                bucketId: config.bucketID,
                fileId: ID.unique(),
                file: file,

            });
            return result;
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileId) {
        try {
             await this.bucket.deleteFile({
                bucketId: config.bucketID,
                fileId: fileId
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

     getFilePreview(fileId) {
        try {
            const result = this.bucket.getFileView({
                bucketId: config.bucketID,
                fileId: fileId,
            })
            return result
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
        }
    }

}

const dbService = new databaseService();
export default dbService;