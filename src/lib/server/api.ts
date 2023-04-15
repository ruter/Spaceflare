import { env } from "$env/dynamic/private";

const API_TOKEN = env.CF_API_TOKEN;
const ZONE_ID = env.CF_ZONE_ID;

const BASE_URL = "https://api.cloudflare.com/client/v4";

const listDNSRecords = async () => {
  const END_POINT = `/zones/${ZONE_ID}/dns_records`;
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

export { listDNSRecords };
