import { getPost } from "@/api/posts";
import { getUser } from "@/api/users";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function Post({ id }: { id: number }) {
  const postQuery: UseQueryResult<Post, Error> = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const userQuery: UseQueryResult<User, Error> = useQuery({
    queryKey: ["users", postQuery.data?.userId ?? 0],
    enabled: postQuery.data?.userId != null,
    queryFn: () => getUser(postQuery.data?.userId ?? 0),
  });

  if (postQuery.status === "pending") return <h1>Loading...</h1>;
  if (postQuery.status === "error")
    return <h1>{JSON.stringify(postQuery.error)}</h1>;

  return (
    <article className="card border-[1px] border-border">
      <div className="p-4 flex flex-col gap-1">
        <h2 className="card-header">{postQuery.data.title}</h2>
        <p className="text-content2">{postQuery.data.body}</p>
        <small className="text-primary">
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data?.name}
        </small>
      </div>
    </article>
  );
}
