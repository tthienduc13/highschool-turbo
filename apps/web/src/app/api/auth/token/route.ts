// app/api/auth/token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@highschool/lib/constants";
import { auth } from "@highschool/react-query/auth";

/**
 * API route to set the access token cookie
 * POST /api/auth/token
 */
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { error: "No access token available" },
        { status: 400 },
      );
    }

    // Set the cookie
    cookieStore.set(ACCESS_TOKEN, session.user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting access token:", error);

    return NextResponse.json(
      { error: "Failed to set access token" },
      { status: 500 },
    );
  }
}

/**
 * API route to refresh the access token
 * PUT /api/auth/token
 */
export async function PUT() {
  try {
    const session = await auth();
    const cookieStore = await cookies();

    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    if (session.user?.accessToken) {
      cookieStore.set(ACCESS_TOKEN, session.user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "No access token available after refresh" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return NextResponse.json(
      { error: "Failed to refresh access token" },
      { status: 500 },
    );
  }
}

/**
 * API route to clear the access token cookie
 * DELETE /api/auth/token
 */
export async function DELETE() {
  const cookieStore = await cookies();

  try {
    cookieStore.delete(ACCESS_TOKEN);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing access token:", error);

    return NextResponse.json(
      { error: "Failed to clear access token" },
      { status: 500 },
    );
  }
}
