import { useState } from "react";

import { PostsList } from "./PostsList";
import { CreatePost } from "./CreatePost";
import { PostsListInfinite } from "./PostsListInfinite";
import { PostsListPaginated } from "./PostsListPaginated";
import { useQueryClient } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";

export function QueryBasics() {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<PostsList />);

  const queryClient = useQueryClient();

  function updatePage(pageNumber: number, page: JSX.Element) {
    setSelectedPage(pageNumber);
    setCurrentPage(page);
  }

  // * Prefetching Data
  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: () => getPosts(),
    });
  }

  return (
    <main className="m-4 flex flex-col gap-4">
      <section className="tabs tabs-boxed flex-nowrap gap-1">
        <div
          onMouseEnter={onHoverPostOneLink}
          className={`tab ${selectedPage === 1 && "tab-active"}`}
          onClick={() => updatePage(1, <PostsList />)}
        >
          Posts List
        </div>
        <div
          className={`tab ${selectedPage === 2 && "tab-active"}`}
          onClick={() =>
            updatePage(2, <CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          New Post
        </div>
        <div
          className={`tab ${selectedPage === 3 && "tab-active"}`}
          onClick={() => updatePage(3, <PostsListPaginated />)}
        >
          Posts List (Paginated)
        </div>
        <div
          className={`tab ${selectedPage === 4 && "tab-active"}`}
          onClick={() => updatePage(4, <PostsListInfinite />)}
        >
          Posts List (Infinite)
        </div>
      </section>
      {currentPage}
    </main>
  );
}
