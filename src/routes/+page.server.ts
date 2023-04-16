import type { Actions, PageServerLoad } from "./$types";
import { listRecords, updateRecord } from "$lib/server/api";
import { DNSRecord } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";

export const load = (async (event) => {
  const data = await listRecords();
  const results: any[] = data.success ? data.result : [];
  const recordMap = Object.fromEntries(results.map(item => [item.id, JSON.parse(JSON.stringify(item))]));
  return {
    title: "Spaceflare",
    results,
    recordMap,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data  = await request.formData();
    const id = data.get("id")?.toString() || "";
    const record = {
      name: data.get("name")?.toString(),
      type: data.get("type")?.toString(),
      content: data.get("content")?.toString(),
      comment: data.get("comment")?.toString(),
      ttl: parseInt(data.get("ttl")?.toString() || "0"),
      proxied: data.get("proxied") === "true",
    } as DNSRecord;

    const { errors, success } = await updateRecord(id, record);

    if (success) {
      throw redirect(303, "/");
    } else {
      return fail(400, { id: id, incorrect: true, error: errors[0].message });
    }
  },
} satisfies Actions;
