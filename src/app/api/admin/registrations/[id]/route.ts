import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

const allowedStatuses = new Set([
  "PENDING",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
]);

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Authentication required.", 401);
  }

  if (request.method !== "PATCH") {
    return jsonError("Method not allowed.", 405);
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    return jsonError("Registration ID must be a positive integer.", 400);
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
    !("status" in body) ||
    typeof body.status !== "string" ||
    !allowedStatuses.has(body.status)
  ) {
    return jsonError(
      "Request body must contain only a valid status: PENDING, UNDER_REVIEW, APPROVED, or REJECTED.",
      400
    );
  }

  try {
    const registration = await db.orm.public.DoctorRegistration
      .where({ id })
      .first();

    if (!registration) {
      return jsonError("Registration application not found.", 404);
    }

    await db.orm.public.DoctorRegistration
      .where({ id })
      .update({ status: body.status });

    return Response.json({
      success: true,
      id,
      status: body.status,
    });
  } catch (error) {
    console.error("Registration status update failed:", error);
    return jsonError("Unable to update the registration status.", 500);
  }
}
