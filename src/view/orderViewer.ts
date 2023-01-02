import { Order } from "@prisma/client";

// type FullArticle = Article & {
//   tagList: Tag[];
//   author: User & { followedBy: User[] };
//   _count: { favoritedBy: number };
// };

export default function orderViewer(
  order: Order,
) {

  const orderViewer = {
    order,
  };
  return orderViewer;
}
