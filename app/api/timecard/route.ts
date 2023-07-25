import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  try {
    if (timeCardId) {
      const timeCard = await prisma.timeCard.findUnique({
        where: { id: timeCardId,
                 employee: {
                    companyId: user.id
                  }},
        include: { employee: true },
      });
      return new Response(JSON.stringify(timeCard), { status: 200 });
    } else {
      const timeCards = await prisma.timeCard.findMany({
        where: { 
          employee: {
            companyId: user.id
          }},
        select: {
          id: true,
          employee: { select: { id: true, name: true, companyId:true} },
          timeIn: true,
          timeOut: true,
        },
      });
      return new Response(JSON.stringify(timeCards), { status: 200 });
    }
  } catch (error) {
    return new Response('Error retrieving time cards.', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  
  const body = await req.json();
  const { employeeId, timeIn, timeOut } = body;

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });
  console.log(employee)
  if (employee?.companyId != user.id) return new Response('Error creating the time card.', { status: 500 });
  
  try {
    const timeCard = await prisma.timeCard.create({
      data: { 
              employeeId: employeeId, 
              timeIn: timeIn, 
              timeOut: timeOut,
              //employee: employee,
            },
    });
    
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    throw error;//return new Response('Error creating the time card.', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  if (!timeCardId) return new Response('Missing timeCardId', { status: 400 });

  const body = await req.json();

  try {
    const timeCard = await prisma.timeCard.update({
      where: { id: timeCardId,
               employee: {
                  companyId: user.id
                }},
      data: body,
    });
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    return new Response('Error updating the time card.', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  if (!timeCardId) return new Response('Missing timeCardId', { status: 400 });

  try {
    const timeCard = await prisma.timeCard.delete({
      where: { id: timeCardId,
               employee: {
                  companyId: user.id
                }},
    });
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    return new Response('Error deleting the time card.', { status: 500 });
  }
}
