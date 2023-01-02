import { User } from "@prisma/client";

export default function userViewer(user: User, token: string) {
  const userView = {
    user: {
      token: token,
      name: user.name,
      role: user.role,
    },
  };
  return userView;
}
