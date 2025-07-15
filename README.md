# 📁 Google Drive MCP Integration

This project provides a containerized REST API and **Model Context Protocol (MCP)** interface for managing files and folders on **Google Drive**, built using **Node.js**, **TypeScript**, and **Docker**.

---

## 🚀 Features

- List files
- Create folders
- Upload new files
- Update existing files
- Expose endpoints for MCP (Model Context Protocol) integration

---

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:devgrunge/google-drive-mcp.git
cd google-drive-mcp
```

### 2. Add credentials

Place your credentials.json file in the project root. This should be a Service Account Key from the Google Cloud Console.

###  3. Configure environment

Create a .env file:

```bash
PORT=3000
```

### 4. Build and run with Docker

```bash
docker build -t google-drive-mcp .
docker run -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/credentials.json:/app/credentials.json \
  google-drive-mcp
```

⸻

## API Endpoints

GET /files

List the latest 10 files in Google Drive.

```bash
curl -X GET http://localhost:3000/files
```

⸻

POST /folder

Create a new folder.

Body JSON:

```JSON
{
  "name": "Nova Pasta"
}
```

Example:

```JSON
curl -X POST http://localhost:3000/folder \
  -H "Content-Type: application/json" \
  -d '{"name":"Nova Pasta"}'
```

⸻

POST /upload

Upload a new file.

Body JSON:

```JSON
{
  "filename": "document.txt",
  "mimeType": "text/plain",
  "filepath": "/absolute/path/inside/container/document.txt"
}
```

Example:

```JSON
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: application/json" \
  -d '{"filename":"document.txt","mimeType":"text/plain","filepath":"/app/files/document.txt"}'
```

⸻

PUT /update/:id

Update the content of an existing file.

Params:
	•	id: File ID (from Google Drive)

Body JSON:


```JSON
{
  "filepath": "/absolute/path/inside/container/updated.txt",
  "mimeType": "text/plain"
}
```

Example:
```BASH
curl -X PUT http://localhost:3000/update/1AbcD1234567 \
  -H "Content-Type: application/json" \
  -d '{"filepath":"/app/files/updated.txt","mimeType":"text/plain"}'
```

⸻

### MCP Integration

To use this API as an MCP server:

Discovery endpoint

GET /mcp/capabilities

Returns a list of available tools and resources.

Invoke tool

POST /mcp/invoke

Body JSON:

```JSON
{
  "tool": "upload_file",
  "args": {
    "filename": "sample.txt",
    "mimeType": "text/plain",
    "filepath": "/app/files/sample.txt"
  }
}
```

Each tool name matches an endpoint function (e.g., list_files, create_folder, etc.).

⸻

📁 Project Structure
```BASH
src/
├── index.ts                  # Main entrypoint
├── app.ts                   # Express API
├── services/
│   └── googleDrive.service.ts
├── mcp/
│   └── server.ts            # MCP endpoint handlers
credentials.json
Dockerfile
.env
tsconfig.json
```