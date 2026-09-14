import React, { Suspense } from "react";
import SuccessClient from "../../../components/SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SuccessClient />
    </Suspense>
  );
}