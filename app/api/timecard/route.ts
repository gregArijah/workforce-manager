import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');
  const employeeId = searchParams.get('employeeId');
  const toDate = searchParams.get('toDate');
  const fromDate = searchParams.get('fromDate'); 

  const convToDate = toDate? new Date(toDate) : null;
  const convFromDate = fromDate? new Date(fromDate) : null;
  if (convToDate) convToDate.setDate(convToDate.getDate()+1);

  console.log("to date: " , convToDate)
  console.log("from date: " , convFromDate)

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
      const timeCards = await prisma.employee.findMany({
        where: { 
          companyId: user.id,
          },
          select: {
            id: true,
            name: true,
            code: true,
            companyId: true,
            department: { select: { code: true } },
            timeCards: { 
                         where: {
                            timeIn:{
                                lt: convToDate as any,
                                gte: convFromDate as any
                              }
                         },
                         select: { timeIn: true, timeOut: true, duration: true},
                
                        },
           
          },
        });

       

      return new Response(JSON.stringify(timeCards), { status: 200 });
    }
  } catch (error) {
    return console.log(error)//new Response('Error retrieving time cards.', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  
  const body = await req.json();
  const { employeeId, timeIn, timeOut } = body; //timeout

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
              timeIn, 
              //timeOut,
              employee: { connect: { id: employeeId } },
            },
    });
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: { isClockedIn: true },
    });
    
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    throw error;//return new Response('Error creating the time card.', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  //const timeCardId = searchParams.get('timeCardId');
  const employeeId = searchParams.get('employeeId');

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  //if (!timeCardId) return new Response('Missing timeCardId', { status: 400 });
  if (!employeeId) return new Response('Missing employeeId', { status: 400 });
  
  const timeIn = await prisma.timeCard.findMany({
    where: { employeeId: employeeId, //? employeeId : undefined,
              timeOut: null,
            },
    select: { timeIn: true },
  });
  if (!timeIn) return new Response('Error updating the time card.', { status: 500 });
  const thistime = timeIn[0].timeIn;
  const duration = (new Date().getTime()-thistime.getTime())/(1000*60*60);

  const body = await req.json();
  //add duration to body
  body.duration = duration;

  try {
    const timeCard = await prisma.timeCard.updateMany({
      where: { employeeId: employeeId, //? employeeId : undefined,
               timeOut: null,
             },
      data: body,
    });
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: { isClockedIn: false },
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
