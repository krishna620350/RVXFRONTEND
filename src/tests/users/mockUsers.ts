import { faker } from "@faker-js/faker";

export interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export const mockUsers: MockUser[] = Array.from({ length: 20000 }).map(
  (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["Admin", "Moderator", "User"]),
    status: faker.helpers.arrayElement(["Active", "Inactive", "Closed"]),
    createdAt: faker.date
      .between({
        from: "2023-01-01T00:00:00.000Z",
        to: "2025-06-28T00:00:00.000Z",
      })
      .toISOString(),
  })
);
