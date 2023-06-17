import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      if (id) {
        try {
          const employee = await prisma.employee.findUnique({
            where: { id: typeof id === 'string' ? id : undefined },
            include: { department: true, company: true, timeCard: true },
          });
          res.status(200).json(employee);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving the employee.' });
        }
      } else {
        try {
          const employees = await prisma.employee.findMany();
          res.status(200).json(employees);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving employees.' });
        }
      }
      break;

    case 'POST':
      const { name, code, departmentId, companyId } = req.body;
      try {
        const employee = await prisma.employee.create({
          data: { name, code, departmentId, companyId },
        });
        res.status(201).json(employee);
      } catch (error) {
        res.status(500).json({ error: 'Error creating the employee.' });
      }
      break;

    case 'PUT':
      try {
        const { name, code, departmentId, companyId } = req.body;
        const updatedEmployee = await prisma.employee.update({
          where: { id: typeof id === 'string' ? id : undefined },
          data: { name, code, departmentId, companyId },
        });
        res.status(200).json(updatedEmployee);
      } catch (error) {
        res.status(500).json({ error: 'Error updating the employee.' });
      }
      break;

    case 'DELETE':
      try {
        const deletedEmployee = await prisma.employee.delete({
          where: { id: typeof id === 'string' ? id : undefined },
        });
        res.status(200).json(deletedEmployee);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting the employee.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
