import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);
  const user:any = session?.user;

  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');

  try {
    if (employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { 
                  id: employeeId,
                  companyId: user.id
                },
        // include: { company: true, department: true },
      });
      return new Response(JSON.stringify(employee), { status: 200 });
    } else {
      const employees = await prisma.employee.findMany({
        where: { companyId: user.id },
        select: {
          id: true,
          name: true,
          code: true,
          department: { select: { name: true } },
        },
      });
      return new Response(JSON.stringify(employees), { status: 200 });
    }
  } catch (error) {
    return new Response('Error retrieving employees.', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, code, departmentId, companyId } = body;

  try {
    const employee = await prisma.employee.create({
      data: { name, code, departmentId, companyId },
    });
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    return new Response('Error creating the employee.', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');

  if (!employeeId) return new Response('Missing employeeId', { status: 400 });

  const body = await req.json();

  try {
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: body,
    });
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    return new Response('Error updating the employee.', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');

  if (!employeeId) return new Response('Missing employeeId', { status: 400 });

  try {
    const employee = await prisma.employee.delete({
      where: { id: employeeId },
    });
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    return new Response('Error deleting the employee.', { status: 500 });
  }
}
