import Role from "../schemas/roles";

export async function seed():Promise<void>{
    await Role.deleteMany({});

    await Role.insertMany([
        {
            name:'admin',
            description:'Provides all privileges'
        },
        {
            name:'public',
            description:'Same as not having any privileges'
        }
    ])
}