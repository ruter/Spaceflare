import { json } from '@sveltejs/kit';
import { deleteRecord, updateRecord } from "$lib/server/api";

export async function DELETE({ params }) {
    const { errors, result, success } = await deleteRecord(params.id);
    if (success) {
        return json({ result }, { status: 200 });
    } else {
        return json({ errors }, { status: 500 });
    }
}
