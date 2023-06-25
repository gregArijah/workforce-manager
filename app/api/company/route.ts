import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '../../lib/prisma';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const  id  = searchParams.get("id")||null;
    console.log(id);
    
    try {
      if(id) {
        const company = await prisma.company.findUnique({
          where: { id: typeof id === 'string' ? id : undefined },
          include: { departments: true, employees: true },
        });
        console.log(company);
        return new Response(JSON.stringify(company),{
          status: 200	
        })
      }
        
      else {
        const companies = await prisma.company.findMany({
          select: {
            name: true,
            code: true,
          },
        });
        console.log(companies);
        return new Response(JSON.stringify(companies),{
          status: 200
        })
      }
    } catch (error) {
      //do something
      return new Response( 'Error retrieving the company.',{
        status: 500
      }

      );
    }
  }

export async function POST(req: NextApiRequest) {
  const { name, password, adminPassword } = req.body;
  try {
    const company = await prisma.company.create({
      data: { name, password, adminPassword },
    });
    return new Response(JSON.stringify(company),{
      status: 200
    })
  } catch (error) {
    return new Response( 'Error creating the company.',{
      status: 500
    }

    );
  }
}

// async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { name, code, password, adminPassword } = req.body;
//   try {
//     const company = await prisma.company.create({
//       data: { name, code, password, adminPassword },
//     });
//     res.status(201).json(company);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating the company.' });
//   }
// }

// async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const { name, code, password, adminPassword } = req.body;

//   try {
//     const updatedCompany = await prisma.company.update({
//       where: { id: typeof id === 'string' ? id : undefined },
//       data: { name, code, password, adminPassword },
//     });
//     res.status(200).json(updatedCompany);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating the company.' });
//   }
// }

// async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     const deletedCompany = await prisma.company.delete({
//       where: { id: typeof id === 'string' ? id : undefined },
//     });
//     res.status(200).json(deletedCompany);
//   } catch (error) {
//     res.status(500).json({ error: 'Error deleting the company.' });
//   }
// }
// }