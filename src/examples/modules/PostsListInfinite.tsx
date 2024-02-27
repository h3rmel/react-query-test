import { useInfiniteQuery } from "@tanstack/react-query";

import { getPostsPaginated } from "@/api/posts";

export function PostsListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PostsPagination, Error>({
    queryKey: ["posts", "infinite"],
    getNextPageParam: (previousData) => previousData.nextPage,
    queryFn: ({ pageParam }) => getPostsPaginated(pageParam as number),
    initialPageParam: 1,
  });

  console.log({ ...data });

  if (status === "pending") return <div className="spinner-circle m-4" />;
  if (status === "error") return <pre>{JSON.stringify(error)}</pre>;

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-wider">
        Posts List (Infinite)
      </h1>
      <section className="flex flex-col gap-2">
        {data.pages
          .flatMap((pages) => pages.posts)
          .map((post: Post) => (
            <article className="card border-[1px] border-border" key={post.id}>
              <div className="p-4">
                <h2 className="card-header">{post.title}</h2>
                <p className="text-content2">{post.body}</p>
              </div>
            </article>
          ))}
      </section>
      <section className="flex gap-1">
        {hasNextPage && (
          <button className="btn" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </section>
    </section>
  );
}
