import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

function slugify(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

  return slug || "doctor";
}

async function createUniqueSlug(baseSlug: string) {
  let candidate = baseSlug;
  let suffix = 2;

  while (await db.orm.public.Doctor.where({ slug: candidate }).first()) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return jsonError("Authentication required.", 401);
  }

  if (request.method !== "POST") {
    return jsonError("Method not allowed.", 405);
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    return jsonError("Registration ID must be a positive integer.", 400);
  }

  try {
    const registration = await db.orm.public.DoctorRegistration
      .where({ id })
      .first();

    if (!registration) {
      return jsonError("Registration application not found.", 404);
    }

    if (registration.status.toUpperCase() !== "APPROVED") {
      return jsonError(
        "Only approved registration applications can create Doctor profiles.",
        400
      );
    }

    const registrationNumber = registration.registrationNumber?.trim();
    const email = registration.email?.trim();
    let existingDoctor = null;

    if (registrationNumber) {
      existingDoctor = await db.orm.public.Doctor
        .where({ registrationNumber })
        .first();
    }

    if (!existingDoctor && email) {
      existingDoctor = await db.orm.public.Doctor.where({ email }).first();
    }

    if (existingDoctor) {
      return Response.json(
        {
          success: false,
          error: "A matching Doctor profile already exists for this application.",
          doctorId: existingDoctor.id,
          slug: existingDoctor.slug,
        },
        { status: 409 }
      );
    }

    const slug = await createUniqueSlug(slugify(registration.name));
    const doctor = await db.orm.public.Doctor.create({
      name: registration.name,
      slug,
      qualification: registration.qualification,
      designation: registration.designation,
      specialty: registration.specialty,
      subSpecialty: registration.subSpecialty,
      registrationNumber: registration.registrationNumber,
      experienceYears: registration.experienceYears,
      languages: registration.languages,
      areasOfExpertise: registration.areasOfExpertise,
      consultationMode: registration.consultationMode,
      consultationFee: registration.consultationFee,
      location: registration.location,
      availability: registration.availability,
      phone: registration.phone,
      email: registration.email,
      website: registration.website,
      photoUrl: registration.photoUrl,
      bio: registration.bio,
      additionalInformation: registration.additionalInformation,
      isActive: true,
    });

    return Response.json(
      {
        success: true,
        doctorId: doctor.id,
        slug: doctor.slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Doctor profile creation failed:", error);
    return jsonError("Unable to create the Doctor profile.", 500);
  }
}
