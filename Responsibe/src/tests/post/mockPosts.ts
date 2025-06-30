import { faker } from "@faker-js/faker";
import type { Post, Profile } from "../../component/Customer/Posts/Posts";

// Generate 10 mock profiles
export const mockProfiles: Profile[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  subtitle: `@${faker.internet.userName().toLowerCase()}`,
  avatar: faker.image.avatar(),
}));

export interface PostWithPic extends Post {
  postPic: string;
  sharedWith: string[];
}

// Generate 20 mock posts
export const mockPosts: PostWithPic[] = Array.from({ length: 20 }, (_, i) => {
  const author = faker.helpers.arrayElement(mockProfiles);
  // Pick 1-3 random users (not the author) for sharedWith
  const sharedWithProfiles = faker.helpers.arrayElements(
    mockProfiles.filter((p) => p.id !== author.id),
    { min: 1, max: 3 }
  );
  return {
    id: i + 1,
    author,
    content: faker.lorem.paragraphs({ min: 2, max: 3 }), // at least 100 words
    postPic: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    createdAt: faker.date.recent({ days: 10 }).toISOString(),
    sharedWith: sharedWithProfiles.map((p) => p.subtitle),
  };
});
