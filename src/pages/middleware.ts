import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const response = NextResponse.next();
  const allowedOrigins = ["http://localhost:3000", "https://my-podcast-three.vercel.app", "https://my-podcast-git-dev-nelsonaraujo93s-projects.vercel.app"];
  const origin = request.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    response.headers.set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}