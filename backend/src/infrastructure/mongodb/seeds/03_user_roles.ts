import Role from "../schemas/roles";
import UserRoles from "../schemas/user_roles";
import User from "../schemas/users";

export async function seed():Promise<void>{
    await UserRoles.deleteMany({});

    const admin=await User.findOne({email:'admin@gmail.com'})
    const role=await Role.findOne({name:'admin'});

    await UserRoles.create([
        {
            user_id:admin?._id,
            role_id:role?._id
        }
    ])
}