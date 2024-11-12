import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function insertUser(req,res){
    if(req.method ==='POST'){
        try{
            console.log("Code is comming till here in insertUser")
            const{name,email,password,address} = req.body;
            
            const newUser = await prisma.User.create({
                data:{
                    name,
                    email,
                    password,
                    address,
                },
            })

            res.status(201).json(newUser);
        }
        catch(error){
            console.error('Error creating new user:', error);
        }
    }
    else{
        res.status(405).json({error:'Method Not Allowed'});
    }
}
