import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function sessionInfo() {
    const session = await getServerSession(authOptions);
    return session?.user?.name;
 
}


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const  id  = searchParams.get("id")||null;
    const matcher = await sessionInfo();
    try {
      if(id) {
        const company = await prisma.company.findUnique({
          where: { id },
          include: { departments: true, employees: true },
        });
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
    return new Response( 'Error creating the company',{
      status: 500
    }

    );
  }
}


export async function PUT(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get("id")||null;
  
  if (!id) return new Response('Missing id', { status: 400 });

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
  
  if (!id) return new Response('Missing id', { status: 400 });

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