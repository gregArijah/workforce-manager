import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const  id  = searchParams.get("id")||null;

    const session = await getServerSession(authOptions);
    const user:any = session?.user;
    
    try {
      if(id) {
        const company = await prisma.company.findUnique({
          where: { id : user.id},
          include: { departments: true, employees: true },
        });
        return new Response(JSON.stringify(company),{
          status: 200	
        })
      }
        
      else {
        const companies = await prisma.company.findMany({
          where: { id: user.id },
          select: {
            name: true,
            code: true,
          },
        });
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

  try {
      
    const company = await prisma.company.create({
      data: { name, password, adminPassword },
    });
    return new Response(JSON.stringify(company),{
      status: 200
    })
  } catch (error) {
      throw error;
    // return new Response( 'Error creating the company',{
    //   status: 500
    // }

    // );
  }
}


export async function PUT(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get("id")||null;

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  if (!id) return new Response('Missing id', { status: 400 });

  if (id != user.id) return new Response('Error updating the company.', { status: 500 });

  const body = await req.json();


  try {
      
    const company = await prisma.company.update({
      where: { id: id},
      data: body,
    });
    return new Response(JSON.stringify(company),{
      status: 200
    })
  } catch (error) {
    return new Response( 'Error creating the company',{
      status: 500
    }

    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get("id")||null;

  const session = await getServerSession(authOptions);  
  const user:any = session?.user;
  
  if (!id) return new Response('Missing id', { status: 400 });

  if (id != user.id) return new Response('Error deleting the company.', { status: 500 });

  try {
      
    const company = await prisma.company.delete({
      where: { id: id},
    });
    return new Response(JSON.stringify(company),{
      status: 200
    })
  } catch (error) {
    return new Response( 'Error creating the company',{
      status: 500
    }

    );
  }
}