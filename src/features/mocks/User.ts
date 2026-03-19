import type { User } from "../useAuthStore/types/User";

export const mockUser: User = {
  id: 42,
  email: 'user@example.com',
  // eslint-disable-next-line max-len
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ItCY0LLQsNC9IiwiaWF0IjoxNTE2MjM5MDIyfQ',
};