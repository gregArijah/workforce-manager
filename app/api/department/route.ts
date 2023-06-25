import { NextRequest } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get('departmentId');

  try {
    if (departmentId) {
      const department = await prisma.department.findUnique({
        where: { id: departmentId },
        include: { company: true },
      });
      return new Response(JSON.stringify(department), { status: 200 });
    } else {
      const departments = await prisma.department.findMany({
        include: { company: true },
        },
      );
      return new Response(JSON.stringify(departments), { status: 200 });
    }
  } catch (error) {
    return new Response('Error retrieving departments.'+error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, code, companyId } = body;

  try {
    const department = await prisma.department.create({
      data: { name, code, companyId },
    });
    return new Response(JSON.stringify(department), { status: 200 });
  } catch (error) {
    return new Response('Error creating the department.', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get('departmentId');

  if (!departmentId) return new Response('Missing departmentId', { status: 400 });

  const body = await req.json();

  try {
    const department = await prisma.department.update({
      where: { id: departmentId },
      data: body,
    });
    return new Response(JSON.stringify(department), { status: 200 });
  } catch (error) {
    return new Response('Error updating the department.', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get('departmentId');

  if (!departmentId) return new Response('Missing departmentId', { status: 400 });

  try {
    const department = await prisma.department.delete({
      where: { id: departmentId },
    });
    return new Response(JSON.stringify(department), { status: 200 });
  } catch (error) {
    return new Response('Error deleting the department.', { status: 500 });
  }
}
