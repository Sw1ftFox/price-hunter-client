import type { User } from "@/shared/types/User";

export const mockUser: User = {
  id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
  email: 'user@example.com',
  // eslint-disable-next-line max-len
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ItCY0LLQsNC9IiwiaWF0IjoxNTE2MjM5MDIyfQ',
};