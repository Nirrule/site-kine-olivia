import { NextRequest, NextResponse } from "next/server";

function getApiUrlForClient(req: NextRequest): string {
 const clientApiUrl = req.nextUrl.searchParams.get("apiUrl");
 if (!clientApiUrl) throw new Error("API URL manquante");
 return clientApiUrl;
}

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();

  const apiUrl = getApiUrlForClient(req);

  const adminEmail = process.env.ADMIN_EMAIL!;
  const payload = { ...body, adminEmail };

  const response = await fetch(`${apiUrl}/api/website/appointments`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(payload),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
 } catch (err) {
  return NextResponse.json(
   { error: err instanceof Error ? err.message : "Erreur serveur" },
   { status: 500 },
  );
 }
}
