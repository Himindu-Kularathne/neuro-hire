// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

type FolderMetadata = {
  name: string;
  mimeType: string;
  parents?: string[];
};

export const createFolder = async (
  token: string,
  folderName: string,
  parentId?: string,
) => {
  const metadata: FolderMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const res = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to create folder");
  }
  return result.id; // Folder ID
};

export const uploadFileToFolder = async (
  token: string,
  file: File,
  folderId: string,
) => {
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" }),
  );
  form.append("file", file);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: form,
    },
  );

  const result = await res.json();
  return result.id; // File ID
};
