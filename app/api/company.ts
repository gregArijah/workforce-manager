import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      if (id) {
        try {
          const company = await prisma.company.findUnique({
            where: { id: typeof id === 'string' ? id : undefined },
            include: { departments: true, employees: true },
          });
          res.status(200).json(company);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving the company.' });
        }
      } else {
        try {
          const companies = await prisma.company.findMany();
          res.status(200).json(companies);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving companies.' });
        }
      }
      break;

    case 'POST':
      const { name, code, password, adminPassword } = req.body;
      try {
        const company = await prisma.company.create({
          data: { name, code, password, adminPassword },
        });
        res.status(201).json(company);
      } catch (error) {
        res.status(500).json({ error: 'Error creating the company.' });
      }
      break;

    case 'PUT':
      try {
        const { name, code, password, adminPassword } = req.body;
        const updatedCompany = await prisma.company.update({
          where: { id: typeof id === 'string' ? id : undefined},
          data: { name, code, password, adminPassword },
        });
        res.status(200).json(updatedCompany);
      } catch (error) {
        res.status(500).json({ error: 'Error updating the company.' });
      }
      break;

    case 'DELETE':
      try {
        const deletedCompany = await prisma.company.delete({
          where: { id: typeof id === 'string' ? id : undefined },
        });
        res.status(200).json(deletedCompany);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting the company.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
