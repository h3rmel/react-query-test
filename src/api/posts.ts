import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:3000/posts", {
      params: { _sort: "title" },
    })
    .then((response) => response.data);
}

export function getPostsPaginated(page: number): Promise<PostsPagination> {
  return axios
    .get("http://localhost:3000/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then((response) => {
      const hasNext = page * 3 <= parseInt(response.headers["x-total-count"]);
      
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: response.data,
      };
    });
}

export function getPost(id: number) {
  return axios
    .get(`http://localhost:3000/posts/${id}`)
    .then((response) => response.data);
}

export function createPost({ title, body }: { title: string; body: string }) {
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
      userId: 1,
      id: String(Date.now()),
    })
    .then((response) => response.data);
}
