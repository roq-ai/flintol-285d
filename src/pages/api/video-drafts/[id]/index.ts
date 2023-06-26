import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { videoDraftValidationSchema } from 'validationSchema/video-drafts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.video_draft
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVideoDraftById();
    case 'PUT':
      return updateVideoDraftById();
    case 'DELETE':
      return deleteVideoDraftById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVideoDraftById() {
    const data = await prisma.video_draft.findFirst(convertQueryToPrismaUtil(req.query, 'video_draft'));
    return res.status(200).json(data);
  }

  async function updateVideoDraftById() {
    await videoDraftValidationSchema.validate(req.body);
    const data = await prisma.video_draft.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVideoDraftById() {
    const data = await prisma.video_draft.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
