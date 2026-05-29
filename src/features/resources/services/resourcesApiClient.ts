import axios from "axios";

const RESOURCES_API_TIMEOUT_MS = 5000;

/** Dedicated client for free-resources APIs — shorter timeout so UI falls back quickly. */
const resourcesApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: RESOURCES_API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

export function isResourcesApiConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_API_URL?.trim());
}

export default resourcesApiClient;
