import { User } from "@prisma/client";

export default function userViewer(user: User, token: string) {
  const userView = {
    user: {
      token: token,
      username: user.name,
    },
  };
  return userView;
}
