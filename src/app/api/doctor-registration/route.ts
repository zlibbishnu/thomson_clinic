import { db } from "@/lib/db";

class RegistrationValidationError extends Error {}

function requiredText(formData: FormData, field: string, label: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    throw new RegistrationValidationError(`${label} is required.`);
  }

  return value.trim();
}

function optionalText(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalInteger(formData: FormData, field: string, label: string) {
  const value = optionalText(formData, field);

  if (value === null) {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    throw new RegistrationValidationError(`${label} must be a whole number.`);
  }

  return parsedValue;
}

function optionalUrl(formData: FormData, field: string, label: string) {
  const value = optionalText(formData, field);

  if (value === null) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    throw new RegistrationValidationError(`${label} must be a valid URL.`);
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = requiredText(formData, "email", "Professional email");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new RegistrationValidationError(
        "Professional email must be a valid email address."
      );
    }

    const registration = await db.orm.public.DoctorRegistration.create({
      name: requiredText(formData, "fullName", "Full name"),
      qualification: requiredText(formData, "qualification", "Qualification"),
      designation: requiredText(formData, "designation", "Designation"),
      specialty: requiredText(formData, "specialty", "Specialty"),
      subSpecialty: optionalText(formData, "subSpecialty"),
      registrationNumber: requiredText(
        formData,
        "registrationNumber",
        "Medical registration number"
      ),
      experienceYears: optionalInteger(
        formData,
        "experience",
        "Years of experience"
      ),
      languages: optionalText(formData, "languages"),
      areasOfExpertise: optionalText(formData, "expertise"),
      consultationMode: optionalText(formData, "consultationMode"),
      consultationFee: optionalInteger(
        formData,
        "consultationFee",
        "Consultation fee"
      ),
      location: optionalText(formData, "location"),
      availability: optionalText(formData, "availability"),
      email,
      phone: optionalText(formData, "phone"),
      website: optionalUrl(formData, "website", "Professional website"),
      photoUrl: optionalUrl(formData, "photoUrl", "Profile photo URL"),
      bio: requiredText(formData, "bio", "Professional bio"),
      additionalInformation: optionalText(formData, "additionalInfo"),
      status: "PENDING",
    });

    return Response.json({
      success: true,
      registrationId: registration.id,
    });
  } catch (error) {
    console.error("Doctor registration submission failed:", error);

    if (error instanceof RegistrationValidationError) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Unable to submit your registration application. Please try again.",
      },
      { status: 500 }
    );
  }
}
