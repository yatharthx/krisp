import type { H3Event, EventHandlerResponse } from "h3";

import { getPosts } from "@/src/fs/utils";

import { view } from "./view";

// Root controller class
class Controller {
  public static path: string;

  action(_event: H3Event): EventHandlerResponse {
    throw new Error("Controller action is not defined");
  }

  render(template: string, context: Record<string, unknown>): string {
    return view.render(template, context);
  }
}

// controllers
class IndexController extends Controller {
  public static path = "/";

  async action(event: H3Event): Promise<EventHandlerResponse> {
    const posts = await getPosts();
    const html = this.render("index", {
      posts,
    });

    return html;
  }
}

class PostsController extends Controller {
  public static path = "/posts/:slug";

  async action(event: H3Event): Promise<EventHandlerResponse> {
    const posts = await getPosts();
    const post = posts.find((post) => post.slug === event.context.params?.slug);
    if (!post) {
      throw new Error("Post not found");
    }
    const html = this.render("post", {
      post,
    });

    return html;
  }
}

// export controllers
export const controllers = [IndexController, PostsController];
