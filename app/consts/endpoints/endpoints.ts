const isDev = true;
const isPreview = false;
const isProd = false;

const apiVersion = "";

const port = "8000";
const localUrl = `http://127.0.0.1:${port}`;
const previewUrl = `http://172.22.111.47:${port}`;
const url = isDev
  ? `${localUrl}/api${apiVersion ? `/${apiVersion}` : ""}`
  : isPreview
  ? `${previewUrl}/api${apiVersion ? `/${apiVersion}` : ""}`
  : isProd
  ? `${previewUrl}/api${apiVersion ? `/${apiVersion}` : ""}`
  : `${localUrl}/api${apiVersion ? `/${apiVersion}` : ""}`;

export const ENDPOINTS = {
  API: url,
};
