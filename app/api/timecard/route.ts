import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');

  try {
    if (timeCardId) {
      const timeCard = await prisma.timeCard.findUnique({
        where: { id: timeCardId },
        include: { employee: true },
      });
      return new Response(JSON.stringify(timeCard), { status: 200 });
    } else {
      const timeCards = await prisma.timeCard.findMany({
        select: {
          id: true,
          employee: { select: { id: true, name: true } },
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

  try {
    const timeCard = await prisma.timeCard.create({
      data: { employeeId, timeIn, timeOut },
    });
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    return new Response('Error creating the time card.', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeCardId = searchParams.get('timeCardId');

  if (!timeCardId) return new Response('Missing timeCardId', { status: 400 });

  const body = await req.json();

  try {
    const timeCard = await prisma.timeCard.update({
      where: { id: timeCardId },
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

  if (!timeCardId) return new Response('Missing timeCardId', { status: 400 });

  try {
    const timeCard = await prisma.timeCard.delete({
      where: { id: timeCardId },
    });
    return new Response(JSON.stringify(timeCard), { status: 200 });
  } catch (error) {
    return new Response('Error deleting the time card.', { status: 500 });
  }
}
