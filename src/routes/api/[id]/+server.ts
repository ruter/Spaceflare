import { json } from '@sveltejs/kit';
import { deleteRecord, updateRecord } from "$lib/server/api";
import { DNSRecord } from "$lib/types";

export async function PUT({ params, request }) {
	const { data } = await request.json();
    const record = data as DNSRecord;

    const { errors, result, success } = await updateRecord(params.id, record);

    if (success) {
        return json({ result }, { status: 200 });
    } else {
        return json({ errors }, { status: 500 });
    }
}

export async function DELETE({ params }) {
    const { errors, result, success } = await deleteRecord(params.id);
    if (success) {
        return json({ result }, { status: 200 });
    } else {
        return json({ errors }, { status: 500 });
    }
}
