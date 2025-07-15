// src/services/googleDriveService.ts
import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../credentials.json'),
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listFiles() {
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  });

  return res.data.files || [];
}