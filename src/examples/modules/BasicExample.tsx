import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { wait } from "@/utils/wait";

// Types
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

type Post = {
  id: string;
  title: string;
};

// Constants
const POSTS: Post[] = [
  {
    id: "1",
    title: "lorem ipsum dolor sit amet er consectetur adip 1",
  },
  {
    id: "2",
    title: "lorem ipsum dolor sit amet er consectetur adip 2",
  },
];

export function BasicExample() {
  const queryClient = useQueryClient();

  const postsQuery: UseQueryResult<Post[], Error> = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(500).then(() => [...POSTS]),
  });

  const newPostMutation: UseMutationResult<number, Error, string, unknown> =
    useMutation({
      mutationFn: (title: string) => {
        return wait(500).then(() =>
          POSTS.push({
            id: crypto.randomUUID(),
            title: `${title} ${POSTS.length + 1}`,
          })
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });

  // #region Verifications

  if (postsQuery.isLoading) return <div className="spinner-circle m-4"/>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  if (postsQuery.data === undefined)
    return <h1>Ocorreu algum erro ao popular os dados da Query.</h1>;

  // #endregion

  return (
    <main className="flex flex-col items-start gap-4 m-4">
      <button
        className="btn btn-primary"
        disabled={newPostMutation.isPending}
        onClick={() =>
          newPostMutation.mutate(
            "lorem ipsum dolor sit amet er consectetur adip"
          )
        }
      >
        Add New Post
      </button>
      <section className="flex flex-col gap-2">
        {postsQuery.data.map((post) => (
          <article key={post.id} className="card">
            <div className="card-body">
              <p className="text-content2">{post.title}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
