import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
     async deleteAll() {
        return this.dao.deleteAll();
    }
}