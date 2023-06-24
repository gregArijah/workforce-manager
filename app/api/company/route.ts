import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';


export async function GET(req: NextApiRequest, res: NextApiResponse) {

    try {
      const companies = await prisma.company.findMany();
      res.json;
    } catch (error) {
      //do something
    }

    return new Response(JSON.stringify("Ok"))
  //const { id } = req.query||null;

  // try {
  //   const company = await prisma.company.findUnique({
  //     where: { id: typeof id === 'string' ? id : undefined },
  //     include: { departments: true, employees: true },
  //   });
  //   res.status(200).json(company);
  // } catch (error) {
  //   res.status(500).json({ error: 'Error retrieving the company.' });
  // }


export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

//   switch (method) {
//     case 'GET':
//       if (id) {
//         await handleGetRequest(req, res);
//       } else {
//         await handleGetAllRequest(req, res);
//       }
//       break;

//     case 'POST':
//       await handlePostRequest(req, res);
//       break;

//     case 'PUT':
//       await handlePutRequest(req, res);
//       break;

//     case 'DELETE':
//       await handleDeleteRequest(req, res);
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }



async function handleGetAllRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving companies.' });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
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

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
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

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
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
