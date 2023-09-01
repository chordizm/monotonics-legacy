import { UseCases } from "@monotonics/core";
import {
  formidable,
  Fields as FormidableFields,
  Files as FormidableFiles,
} from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { trpc } from "@/utils/trpc";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const useCases = (req as any).useCases as UseCases;
  if (!useCases) res.status(500).end();
  const form = formidable({ multiples: true });
  let fields: FormidableFields | null = null;
  let files: FormidableFiles | null = null;
  try {
    [fields, files] = await form.parse(req);
    console.log("[Add Data] Data received.", fields, files);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
  if (!fields || !files) {
    res.status(400).end();
    return;
  }
  if (Object.keys(files).length === 0) {
    res.status(400).end();
    return;
  }
  const file = files[Object.keys(files)[0]]![0];
  if (!file) {
    res.status(400).end();
    return;
  }
  const inputKeys = ["datasetId"];
  const fieldKeys = Object.keys(fields);

  if (!inputKeys.every((k) => fieldKeys.includes(k))) {
    res.status(400).end();
    return;
  }
  const datasetId = fields.datasetId![0];
  if (!fs.existsSync(file.filepath)) {
    res.status(500).end();
    console.log("File not found.");
    return;
  }
  const stream = fs.createReadStream(file.filepath);
  const dataId = await useCases.addData.execute({
    data: {
      datasetId,
      name: file.originalFilename!,
      date: new Date(),
      mimeType:
        file.mimetype === null ? "application/octet-stream" : file.mimetype,
      items: [],
      params: {},
    },
    stream,
  });
  stream.on("end", () => {
    stream.close();
    fs.unlinkSync(file.filepath);
  });
  const dataset = await useCases.getDataset.execute({ id: datasetId });
  console.log("Running task.", dataset.taskId, dataId);
  useCases.runTask.execute({
    id: dataset.taskId,
    dataId,
  });
  res.status(200).end();
}
