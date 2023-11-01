export interface deleteUserByIdUseCase{
    deleteById(id:string):Promise<number>|never
}