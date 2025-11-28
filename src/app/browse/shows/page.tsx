import React, { Suspense } from "react";
import ClientBrowseShows from "./ClientBrowseShows";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <ClientBrowseShows />
    </Suspense>
  );
}
