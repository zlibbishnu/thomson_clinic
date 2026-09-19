import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Authentication required.", 401);
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    return jsonError("Doctor ID must be a positive integer.", 400);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body) ||
    Object.keys(body).length !== 1 ||
    !("confirmation" in body) ||
    body.confirmation !== "DELETE"
  ) {
    return jsonError('Confirmation must exactly equal "DELETE".', 400);
  }

  try {
    const doctor = await db.orm.public.Doctor.where({ id }).first();

    if (!doctor) {
      return jsonError("Doctor not found.", 404);
    }

    await db.orm.public.Doctor.where({ id }).delete();

    return Response.json({ success: true, doctorId: id });
  } catch (error) {
    console.error("Doctor deletion failed:", error);
    return jsonError("Unable to delete the Doctor.", 500);
  }
}
