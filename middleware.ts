import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/profile", "/notes"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

function isRouteMatch(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

async function refreshSessionIfNeeded(
  cookieStore: Awaited<ReturnType<typeof cookies>>
) {
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return false;

  const data = await checkServerSession();
  const setCookie = data.headers["set-cookie"];
  if (!setCookie) return false;

  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: Number(parsed["Max-Age"]),
    };
    if (parsed.accessToken)
      cookieStore.set("accessToken", parsed.accessToken, options);
    if (parsed.refreshToken)
      cookieStore.set("refreshToken", parsed.refreshToken, options);
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const isPublicRoute = isRouteMatch(pathname, PUBLIC_ROUTES);
  const isPrivateRoute = isRouteMatch(pathname, PRIVATE_ROUTES);

  // 1️⃣ Якщо є accessToken
  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  // 2️⃣ Якщо accessToken немає — пробуємо оновити сесію
  const sessionRestored = await refreshSessionIfNeeded(cookieStore);

  if (sessionRestored) {
    // Якщо сесія оновилась
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url), {
        headers: { Cookie: cookieStore.toString() },
      });
    }
    if (isPrivateRoute) {
      return NextResponse.next({
        headers: { Cookie: cookieStore.toString() },
      });
    }
  }

  // 3️⃣ Якщо сесії немає
  if (isPublicRoute) return NextResponse.next();

  if (isPrivateRoute)
    return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
