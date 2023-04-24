import { env } from "$env/dynamic/private";
import { DNSRecord } from "$lib/types";

const API_TOKEN = env.CF_API_TOKEN;
const ZONE_ID = env.CF_ZONE_ID;

const BASE_URL = "https://api.cloudflare.com/client/v4";

const listZones = async () => {
  const END_POINT = "/zones";
  const API_URL = BASE_URL + END_POINT;

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    }
  });
  const data = await res.json();
  return data;
}

const listRecords = async (zoneId: string) => {
  const END_POINT = `/zones/${zoneId}/dns_records`;
  const API_URL = BASE_URL + END_POINT;

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    }
  });

  const data = await res.json();
  return data;
}

const updateRecord = async (zoneId: string, recordId: string, record: DNSRecord) => {
  const END_POINT = `/zones/${ZONE_ID}/dns_records/${recordId}`;
  const API_URL = BASE_URL + END_POINT;

  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(record),
  });

  const data = await res.json();
  return data;
}

const deleteRecord = async (recordId: string) => {
  const END_POINT = `/zones/${ZONE_ID}/dns_records/${recordId}`;
  const API_URL = BASE_URL + END_POINT;
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    }
  });

  const data = await res.json();
  return data;
}

export { listZones, listRecords, updateRecord, deleteRecord };
