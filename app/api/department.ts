import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case "GET":
            if (id) {
                try {
                    const department = await prisma.department.findUnique({
                        where: { id },
                        include: { employees: true },
                    });
                    res.status(200).json(department);
                } catch (error) {
                    res.status(500).json({ error: "Error retrieving the department." });
                }
            }
            break;

        case "POST":
            const { name, code, company, companyID } = req.body;
            try {
                const department = await prisma.department.create({
                    data: { name, code, company, companyID },
                });
                res.status(201).json(department);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating the department." });
            }
            break;

        case "PUT":
            try {
                const { name, code, company, companyID } = req.body;
                const updatedDepartment = await prisma.department.update({
                    where: { id },
                    data: { name, code, company, companyID },
                });
                res.status(200).json(updatedDepartment);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating the department." });
            }
            break;

        case "DELETE":
            try {
                const deletedDepartment = await prisma.department.delete({
                    where: { id },
                });
                res.status(200).json(deletedDepartment);
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting the department." });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
        }


}