import { Prisma } from "@prisma/client";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchUsers() {
    try{
        const users = await prisma.User.findMany();
        console.log(users)
    }
    catch(error){
        console.log('error fetching users:',error)
    }
}

const SelfTry =() =>{
    return(<div>this is from web page</div>)
}

fetchUsers();
export default SelfTry;
