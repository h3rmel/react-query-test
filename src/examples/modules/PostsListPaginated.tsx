import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPostsPaginated } from "@/api/posts";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

export function PostsListPaginated() {
  const [page, setPage] = useState<number>(1);

  const { status, error, data, isPlaceholderData } = useQuery<
    PostsPagination,
    Error
  >({
    queryKey: ["posts", { page }],
    queryFn: () => getPostsPaginated(page),
    placeholderData: keepPreviousData,
  });

  if (status === "pending") return <div className="spinner-circle m-4" />;
  if (status === "error") return <pre>{JSON.stringify(error)}</pre>;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <hgroup className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-wider">
          Posts List (Paginated)
        </h1>
        <small>{isPlaceholderData && "Previous Data"}</small>
      </hgroup>
      {/* Cards */}
      <section className="flex flex-col gap-2">
        {data.posts.map((post: Post) => (
          <article className="card border-[1px] border-border" key={post.id}>
            <div className="p-4">
              <h2 className="card-header">{post.title}</h2>
              <p className="text-content2">{post.body}</p>
            </div>
          </article>
        ))}
      </section>
      {/* Pagination */}
      <section className="flex items-center gap-2">
        {data.previousPage && (
          <span className="tooltip tooltip-top" data-tooltip="Previous">
            <button
              className="btn"
              onClick={() => setPage(data.previousPage ?? 1)}
            >
              <ChevronLeft />
            </button>
          </span>
        )}
        <div className="card border-[1px] border-border h-10 w-10 grid place-items-center">
          {page}
        </div>
        {data.nextPage && (
          <span className="tooltip tooltip-top" data-tooltip="Next">
            <button className="btn" onClick={() => setPage(data.nextPage ?? 1)}>
              <ChevronRight />
            </button>
          </span>
        )}
      </section>
    </section>
  );
}
