import { ComponentType } from 'react';

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
): Promise<[tag: string, score: number][]>;
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
): Promise<[tag: string, score: number][]>;
export async function getTag(
  tag: string,
  what: 'relatedCategories',
): Promise<[category: string[], score: number][]>;
export async function getTag(tag: string, what: string): Promise<unknown> {
  return (await fetch(`/api/tag/${tag}/${what}.json`)).json();
}

export interface MainPageProps<T extends PostAttribute> {
  hierarchy: Hierarchy;
  recentPosts: Post<T>[];
  recentCategories: string[][];
  recentTags: string[];
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface PostPageProps<T extends PostAttribute> {
  hierarchy: Hierarchy;
  attributes: T;
  MDXContent: ComponentType;
  slug: string;
  tocItems: TocItem[];
}

export interface CategoryPageProps<T extends PostAttribute> {
  category: string[];
  hierarchy: Hierarchy;
  sub: CategorySubNode[];
  relatedTags: [tag: string, score: number][];
  posts: Post<T>[];
}

export interface TagPageProps<T extends PostAttribute> {
  tag: string;
  relatedCategories: [category: string[], score: number][];
  relatedTags: [tag: string, score: number][];
  posts: Post<T>[];
}
