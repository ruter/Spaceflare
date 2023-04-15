import type { Actions, PageServerLoad } from "./$types";
import { listDNSRecords } from "$lib/server/api";

export const load = (async (event) => {
  const data = await listDNSRecords();
  const results: any[] = data.success ? data.result : [];
  const recordMap = Object.fromEntries(results.map(item => [item.id, JSON.parse(JSON.stringify(item))]));
  return {
    title: "Spaceflare",
    results,
    recordMap,
  };
}) satisfies PageServerLoad;
