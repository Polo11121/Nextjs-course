import fs from "fs";
import path from "path";

export const buildPath = (fileName: string) => {
  return path.join(process.cwd(), "data", `${fileName}.json`);
};

export const extractFile = (fileName: string) => {
  const filePath = buildPath(fileName);
  const fileData = fs.readFileSync(filePath);

  return fileData.toString() ? JSON.parse(fileData.toString()) : [];
};
