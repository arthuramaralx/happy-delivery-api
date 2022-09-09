import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createCompanyService from "../services/companies/createCompany.service";
import deleteCompanyService from "../services/companies/deleteCompany.service";
import listCompaniesService from "../services/companies/listCompanies.service";
import listCompanyService from "../services/companies/listCompany.service";
import updateCompanyService from "../services/companies/updateCompany.service";

export const createCompanyController = async (req: Request, res: Response) => {
    const { name, email, password, address } = req.body;

    const newCompany = await createCompanyService({
        name,
        email,
        password,
        address,
    });

    return res.status(201).json(newCompany);
};

export const listCompanyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await listCompanyService(id);

    res.status(200).json(company);
};

export const updateCompanyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, address } = req.body;
    const company = await updateCompanyService(id, {
        name,
        email,
        password,
        address,
    });

    res.status(201).json(company);
};

export const deleteCompanyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await deleteCompanyService(id);

    return res.status(200);
};

export const listCompaniesController = async (req: Request, res: Response) => {
    const companies = await listCompaniesService();

    return res.status(200).json(companies);
};
