import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const fetchURL = `https://api1.fayevr.dev/getstatus?member=196742608846979072`;

    const response = await fetch(fetchURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (response.status === 403) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(500, error.message);
  }
}
