export enum ContentStatus {
    published = "published",
    draft = "draft",
    deleted = "deleted",
}

export enum ContentType {
    page = "page",
    post = "post",
    news = "news",
}

export interface Skill {
    body: string;
    created_at: string;
    deleted_at: string | null;
    id: number;
    priority: number;
    slug: string;
    title: string;
    updated_at: string;
}

export interface Portfolio {
    id: number;
    post_id: number;
    url: string;
    mobile: string;
    desktop: string;
    featured: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Content {
    author_id: number;
    body: string;
    created_at: string;
    deleted_at: string;
    description: string;
    id: number;
    keywords: string;
    nav_text: string;
    order: number;
    parent_id: number;
    portfolio?: Portfolio;
    slug: string;
    status: ContentStatus;
    title: string;
    type: ContentType;
    updated_at: string;
    version_of: number;
}

export interface Tag {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface HomeData {
    portfolio: any;
    skills: [Skill[]];
    post_latest: Content;
    post_news: Content;
    post_testimonials: Content;
}

export interface ContactData {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    message: string | undefined;
}

export interface ApiConfigHeaders {
    "user-agent": string;
    "content-type": string;
    Authorization?: string;
}

export interface ApiConfig {
    cache: string;
    credentials: string;
    headers: ApiConfigHeaders;
    mode: string;
    redirect: string;
    referrer: string;
}

export interface Service {
    body: string;
    created_at: string;
    deleted_at: string | null;
    icon: string;
    id: number;
    slug: string;
    title: string;
    updated_at: string;
}

export interface SidebarData {
    recentPosts: Content[];
    tags: Tag[];
}

export enum ResumeItemType {
    "Ongoing Contract" = "Ongoing Contract",
    "Contract" = "Contract",
    "Contract to hire" = "Contract to hire",
    "Direct Hire" = "Direct Hire",
}
export interface Job {
    logo: string;
    company: string;
    title: string;
    start: string;
    end: string;
    body: string;
    type: ResumeItemType
    skills: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface PaginationData {
  slug: string;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}