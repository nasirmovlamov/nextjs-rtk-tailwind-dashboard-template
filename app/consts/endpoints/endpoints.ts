const isDev = true;
const isPreview = false;
const isProd = false;

const apiVersion = "";

const port = "8080";
const localUrl = `http://172.22.111.140:${port}`;
const previewUrl = `http://172.22.111.140:${port}`;
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
