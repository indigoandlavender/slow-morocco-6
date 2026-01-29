import { google } from "googleapis";

const getGoogleSheetsClient = () => {
  const base64Creds = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!base64Creds) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is not set");
  }

  const credentials = JSON.parse(
    Buffer.from(base64Creds, "base64").toString("utf-8")
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
};

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1LjfPpLzpuQEkeb34MYrrTFad_PM1wjiS4vPS67sNML0";
const TAB_NAME = "Festivals";

export async function getSheetData(tabName: string) {
  const sheets = getGoogleSheetsClient();
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${tabName}!A1:ZZ`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    const headers = rows[0];
    return rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error fetching sheet "${tabName}":`, message);
    return [];
  }
}

export async function getFestivals() {
  return getSheetData("Festivals");
}
