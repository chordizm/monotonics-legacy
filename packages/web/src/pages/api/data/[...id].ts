import { UseCases } from "@monotonics/core";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const useCases = (req as any).useCases as UseCases;
  if (!useCases) res.status(500).end();
  await useCases.getBlobStreamById
    .execute({ id: id as string })
    .then(({ mimeType, stream }) => {
      res.writeHead(200, {
        "Content-Type": mimeType,
      });
      stream.pipe(res);
    });
}
