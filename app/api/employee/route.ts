import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');

  try {
    if (employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: employeeId },
        include: { company: true, department: true },
      });
      return new Response(JSON.stringify(employee), { status: 200 });
    } else {
      const employees = await prisma.employee.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          department: { select: { id: true, name: true } },
          company: { select: { id: true, name: true } },
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
