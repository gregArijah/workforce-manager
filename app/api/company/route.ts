
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

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
  } else 
  {
    try {
      const companies = await prisma.company.findMany();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving companies.' });
    }
  }
}

export async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { name, code, password, adminPassword } = req.body;
  try {
    const company = await prisma.company.create({
      data: { name, code, password, adminPassword },
    });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the company.' });
  }
}

export async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, code, password, adminPassword } = req.body;

  try {
    const updatedCompany = await prisma.company.update({
      where: { id: typeof id === 'string' ? id : undefined },
      data: { name, code, password, adminPassword },
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the company.' });
  }
}

export async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const deletedCompany = await prisma.company.delete({
      where: { id: typeof id === 'string' ? id : undefined },
    });
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the company.' });
  }
}
