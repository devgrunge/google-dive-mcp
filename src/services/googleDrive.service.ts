import { google } from 'googleapis';
import fs from 'fs';

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listFiles() {
  const res = await drive.files.list({ pageSize: 10, fields: 'files(id, name)' });
  return res.data.files || [];
}

export async function uploadFile(filename: string, mimeType: string, filepath: string) {
  const res = await drive.files.create({
    requestBody: { name: filename, mimeType },
    media: {
      mimeType,
      body: fs.createReadStream(filepath),
    },
  });
  return res.data;
}

export async function updateFile(fileId: string, filepath: string, mimeType: string) {
  const res = await drive.files.update({
    fileId,
    media: {
      mimeType,
      body: fs.createReadStream(filepath),
    },
  });
  return res.data;
}

export async function createFolder(name: string) {
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
    },
  });
  return res.data;
}