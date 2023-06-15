import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      if (id) {
        try {
          const timeCard = await prisma.timeCard.findUnique({
            where: { id },
            include: { employee: true },
          });
          res.status(200).json(timeCard);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving the time card.' });
        }
      } else {
        try {
          const timeCards = await prisma.timeCard.findMany();
          res.status(200).json(timeCards);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving time cards.' });
        }
      }
      break;

    case 'POST':
      const { employeeId, timeIn, timeOut } = req.body;
      try {
        const timeCard = await prisma.timeCard.create({
          data: {
            employeeId,
            timeIn: { set: timeIn },
            timeOut: { set: timeOut },
          },
        });
        res.status(201).json(timeCard);
      } catch (error) {
        res.status(500).json({ error: 'Error creating the time card.' });
      }
      break;

    case 'PUT':
      try {
        const { timeIn, timeOut } = req.body;
        const updatedTimeCard = await prisma.timeCard.update({
          where: { id },
          data: {
            timeIn: { set: timeIn },
            timeOut: { set: timeOut },
          },
        });
        res.status(200).json(updatedTimeCard);
      } catch (error) {
        res.status(500).json({ error: 'Error updating the time card.' });
      }
      break;

    case 'DELETE':
      try {
        const deletedTimeCard = await prisma.timeCard.delete({
          where: { id },
        });
        res.status(200).json(deletedTimeCard);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting the time card.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
