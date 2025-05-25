import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Required for pdfjs to work in web
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  if (fileType === "pdf") {
    return await extractTextFromPDF(file);
  } else if (fileType === "docx" || fileType === "doc") {
    return await extractTextFromDocx(file);
  } else {
    throw new Error("Unsupported file type: " + fileType);
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += pageText + "\n";
  }
  return text;
}

async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
