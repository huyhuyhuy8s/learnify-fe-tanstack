import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {} from "@tanstack/react-router";
import { Suspense, useState } from "react";
import "./deferred.scss";

const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ["deferred"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return {
        message: "Hello deferred from the server!",
        status: "success",
        time: new Date(),
      };
    },
  });

export const Route = createFileRoute("/deferred")({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(deferredQueryOptions());
  },
  component: Deferred,
});

function Deferred() {
  const [count, setCount] = useState(0);

  return (
    <div className="deferred">
      <Suspense fallback="Loading Middleman...">
        <DeferredQuery />
      </Suspense>
      <div className="deferred__count">Count: {count}</div>
      <div className="deferred__button">
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());

  return (
    <div className="deferred-query">
      <h1>Deferred Query</h1>
      <div className="deferred-query__status">
        Status: {deferredQuery.data.status}
      </div>
      <div className="deferred-query__message">
        Message: {deferredQuery.data.message}
      </div>
      <div className="deferred-query__time">
        Time: {deferredQuery.data.time.toISOString()}
      </div>
    </div>
  );
}
