import express from 'express';
import { listFiles, uploadFile, updateFile, createFolder } from './services/googleDrive.service';

const app = express();
app.use(express.json());

app.get('/files', async (_req, res) => {
  const files = await listFiles();
  res.json(files);
});

app.post('/upload', async (req, res) => {
  const { filename, mimeType, filepath } = req.body;
  const file = await uploadFile(filename, mimeType, filepath);
  res.json(file);
});

app.put('/update/:id', async (req, res) => {
  const file = await updateFile(req.params.id, req.body.filepath, req.body.mimeType);
  res.json(file);
});

app.post('/folder', async (req, res) => {
  const folder = await createFolder(req.body.name);
  res.json(folder);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));