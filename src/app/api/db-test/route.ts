import { db } from "@/lib/db";

export async function GET() {
  try {
    const doctors = await db.orm.public.Doctor.all();

    return Response.json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return Response.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}