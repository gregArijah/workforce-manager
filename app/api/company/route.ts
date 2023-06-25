import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, password, adminPassword } = body;
  console.log("name",name,"password",password,"adminPassword",adminPassword);

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
