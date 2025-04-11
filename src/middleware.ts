import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

export const authRoutes = ["/login"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        // new URL(`http://localhost:3000/login`, request.url)
        new URL(`https://tastytray.vercel.app/login`, request.url)
      );
    }
  }
};

export const config = {
  matcher: ["/dashboard/:page*"],
};
