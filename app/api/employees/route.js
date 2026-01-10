import employees from "@/../data/employees.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(employees);
}
