import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";

export function PostsList() {
  const postsQuery: UseQueryResult<Post[], Error> = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  //* Testing `useQueries()`
  // const queries = useQueries({
  //   queries: (postsQuery?.data ?? []).map((post: Post) => {
  //     return {
  //       queryKey: ["posts", post.id],
  //       queryFn: () => getPost(post.id),
  //     };
  //   }),
  // });

  // console.log({ ...queries });

  if (postsQuery.status === "pending")
    return <div className="spinner-circle m-4" />;
  if (postsQuery.status === "error")
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <section className="flex flex-col">
      <h1 className="text-3xl font-semibold tracking-wider mb-4">
        Posts List 2
      </h1>
      <section className="flex flex-col gap-2">
        {postsQuery.data.map((post: Post) => (
          <article className="card border-[1px] border-border" key={post.id}>
            <div className="p-4">
              <h2 className="card-header">{post.title}</h2>
              <p className="text-content2">{post.body}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
