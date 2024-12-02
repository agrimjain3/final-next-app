"use client";

import { redirect } from "next/navigation";

export default function backButtonClick() {
  redirect("/customExercises");
  return <></>;
}
