import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

class DoctorValidationError extends Error {}

const allowedFields = new Set([
  "name",
  "slug",
  "qualification",
  "designation",
  "specialty",
  "subSpecialty",
  "registrationNumber",
  "experienceYears",
  "languages",
  "areasOfExpertise",
  "consultationMode",
  "consultationFee",
  "location",
  "availability",
  "phone",
  "email",
  "website",
  "photoUrl",
  "bio",
  "additionalInformation",
  "isActive",
]);

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

function requiredText(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new DoctorValidationError(`${field} is required.`);
  }

  return value.trim();
}

function optionalText(value: unknown, field: string) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "string") {
    throw new DoctorValidationError(`${field} must be text or null.`);
  }

  return value.trim() || null;
}

function optionalInteger(value: unknown, field: string) {
  if (value === null || value === undefined) {
    return null;
  }

  if (!Number.isInteger(value) || typeof value !== "number" || value < 0) {
    throw new DoctorValidationError(
      `${field} must be an integer greater than or equal to zero.`
    );
  }

  return value;
}

function optionalEmail(value: unknown) {
  const email = optionalText(value, "email");

  if (email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new DoctorValidationError("email must be a valid email address.");
  }

  return email;
}

function optionalUrl(value: unknown, field: string) {
  const url = optionalText(value, field);

  if (url === null) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    throw new DoctorValidationError(`${field} must be a valid URL.`);
  }

  return url;
}

function normalizeSlug(value: unknown) {
  const slug = requiredText(value, "slug")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

  if (!slug) {
    throw new DoctorValidationError("slug must contain URL-safe characters.");
  }

  return slug;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Authentication required.", 401);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return jsonError("Request body must be a JSON object.", 400);
  }

  const data = body as Record<string, unknown>;
  const unknownFields = Object.keys(data).filter(
    (field) => !allowedFields.has(field)
  );

  if (unknownFields.length > 0) {
    return jsonError(
      `Unknown fields are not allowed: ${unknownFields.join(", ")}.`,
      400
    );
  }

  try {
    const name = requiredText(data.name, "name");
    const slug = normalizeSlug(data.slug);
    const qualification = requiredText(data.qualification, "qualification");
    const designation = requiredText(data.designation, "designation");
    const specialty = requiredText(data.specialty, "specialty");

    if (data.isActive !== undefined && typeof data.isActive !== "boolean") {
      throw new DoctorValidationError("isActive must be a boolean.");
    }

    const existingDoctor = await db.orm.public.Doctor.where({ slug }).first();

    if (existingDoctor) {
      return jsonError("A Doctor already uses this slug.", 409);
    }

    const doctor = await db.orm.public.Doctor.create({
      name,
      slug,
      qualification,
      designation,
      specialty,
      subSpecialty: optionalText(data.subSpecialty, "subSpecialty"),
      registrationNumber: optionalText(
        data.registrationNumber,
        "registrationNumber"
      ),
      experienceYears: optionalInteger(data.experienceYears, "experienceYears"),
      languages: optionalText(data.languages, "languages"),
      areasOfExpertise: optionalText(data.areasOfExpertise, "areasOfExpertise"),
      consultationMode: optionalText(data.consultationMode, "consultationMode"),
      consultationFee: optionalInteger(data.consultationFee, "consultationFee"),
      location: optionalText(data.location, "location"),
      availability: optionalText(data.availability, "availability"),
      phone: optionalText(data.phone, "phone"),
      email: optionalEmail(data.email),
      website: optionalUrl(data.website, "website"),
      photoUrl: optionalUrl(data.photoUrl, "photoUrl"),
      bio: optionalText(data.bio, "bio"),
      additionalInformation: optionalText(
        data.additionalInformation,
        "additionalInformation"
      ),
      isActive: data.isActive ?? true,
    });

    return Response.json({ success: true, doctor }, { status: 201 });
  } catch (error) {
    console.error("Doctor creation failed:", error);

    if (error instanceof DoctorValidationError) {
      return jsonError(error.message, 400);
    }

    return jsonError("Unable to create the Doctor.", 500);
  }
}
