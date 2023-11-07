import { CreateTokenRepository } from "~/application/ports/repositories/token/create-token-repository";
import { TokenNoSqlRepository } from "./mongodb/token-mongodb-repository";
import { FindTokenByTokenRepository } from "~/application/ports/repositories/token/find-token-by-token-repository";

const tokenDefaultRepository=new TokenNoSqlRepository();

const createTokenRepository:CreateTokenRepository=tokenDefaultRepository;
const findByTokenRepository:FindTokenByTokenRepository=tokenDefaultRepository;

export {createTokenRepository,findByTokenRepository}