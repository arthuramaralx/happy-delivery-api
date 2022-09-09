import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../errors/AppError";
import { ICompanyRequest } from "../../interfaces/companies";

const createCompanyService = async ({ name, address }: ICompanyRequest) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const addressRepo = AppDataSource.getRepository(Addresses);

    const nameAlreadyInUse = await companyRepo.findOneBy({ name });
    const addressAlreadyInUse = await companyRepo.findOneBy({ address });

    if (nameAlreadyInUse) {
        throw new AppError("name already in use", 409);
    }
    if (addressAlreadyInUse) {
        throw new AppError("address already in use", 409);
    }

    if (address.state.length > 2 || address.zipCode.length > 8) {
        throw new AppError("invalid address", 409);
    }

    const newAddress = addressRepo.create(address);
    await addressRepo.save(newAddress);

    const newCompany = companyRepo.create({
        name,
        address: newAddress,
        isActive: true,
        isOpen: false,
    });

    await companyRepo.save(newCompany);

    return newCompany;
};

export default createCompanyService;