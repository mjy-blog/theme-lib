export type HierarchyNode = readonly [name: string, value: HierarchyValue];

export type HierarchyValue =
  | { type: 'post'; title: string }
  | { type: 'category'; sub?: HierarchyNode[] };

export interface Hierarchy {
  nodes: HierarchyNode[];
  path: string[];
}

export interface PostAttribute {
  title: string;
  description: string;
  createTime: string;
  updateTime: string;
  preview?: string;
  tags: string[];
  categories: string[];
}

export interface Post<T extends PostAttribute> {
  attributes: T;
  slug: string;
}

export type CategorySubNode = [name: string, type: 'post' | 'category'];

export async function getCategory<T extends PostAttribute>(
  category: string[],
  what: 'posts',
): Promise<Post<T>>;
export async function getCategory(
  category: string[],
  what: 'relatedTags',
): Promise<[name: string, score: number][]>;
export async function getCategory(
  category: string[],
  what: 'sub',
): Promise<CategorySubNode[]>;
export async function getCategory(
  category: string[],
  what: 'hierarchy',
): Promise<Hierarchy>;
export async function getCategory(
  category: string[],
  what: string,
): Promise<unknown> {
  return (
    await fetch(`/api/category/${category.join('/')}/${what}.json`)
  ).json();
}

export async function getTag<T extends PostAttribute>(
  tag: string,
  what: 'posts',
): Promise<Post<T>>;
export async function getTag(
  tag: string,
  what: 'relatedTags',
): Promise<[string, number][]>;
export async function getTag(
  tag: string,
  what: 'relatedCategories',
): Promise<[string[], number][]>;
export async function getTag(tag: string, what: string): Promise<unknown> {
  return (await fetch(`/api/tag/${tag}/${what}.json`)).json();
}
