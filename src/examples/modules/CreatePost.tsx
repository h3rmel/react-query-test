import { useState, FormEvent, Dispatch, ChangeEvent } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/api/posts";

import { Post } from "./Post";

interface IPostFormData {
  title: string;
  body: string;
}

const DEFAULT_POST_FORM_DATA: IPostFormData = {
  title: "",
  body: "",
};

export function CreatePost({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const [formData, setFormData] = useState<IPostFormData>(
    DEFAULT_POST_FORM_DATA
  );

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    // mutationFn: async (variables: { title: string; body: string }) => {
    //   await createPost(variables);
    // },
    mutationFn: createPost,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createPostMutation.mutate({
      title: formData.title,
      body: formData.body,
    });
  }

  if (createPostMutation.isError) console.error(createPostMutation.error);

  return (
    <section className="flex flex-col gap-4">
      <article className="card p-4">
        <h1 className="text-3xl text-center font-semibold">Create Post</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input max-w-none w-full"
            />
          </div>
          <div className="form-field">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <input
              type="text"
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="input max-w-none w-full"
            />
          </div>
          <div className="form-field pt-4">
            <div className="form-control">
              <button
                className="btn btn-primary w-full"
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? "Loading..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}
