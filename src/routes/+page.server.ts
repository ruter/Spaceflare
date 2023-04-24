import type { PageServerLoad } from "./$types";
import { listZones } from "$lib/server/api";

export const load = (async (event) => {
  const data = await listZones();
  const results: any[] = data.success ? data.result : [];

  return {
    title: "Home",
    results,
  };
}) satisfies PageServerLoad;
