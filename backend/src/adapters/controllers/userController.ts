import { authServiceInterface } from "@src/application/services/authServicesInterface";
import { authService } from "@src/frameworks/services/authService";

const userController={
    authServiceInterface:authServiceInterface,
    authServiceImplementation:authService,
    // userDbRepository:usersDbInterface
}