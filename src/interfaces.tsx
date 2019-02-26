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

export interface DatetimeStamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Address {
    address_1: string;
    address_2: string | undefined;
    city: string;
    state: string;
}

export interface Company extends Address, DatetimeStamps {
    id: number;
    name: string;
    description: string;
    phone: string;
}

export interface Skill extends DatetimeStamps {
    id: number;
    title: string;
    slug: string;
    body: string;
    priority: number;
}

export interface Portfolio extends DatetimeStamps {
    id: number;
    post_id: number;
    url: string;
    mobile: string;
    desktop: string;
    featured: string;
}

export interface Content extends DatetimeStamps {
    author_id: number;
    body: string;
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
    version_of: number;
}

export interface Tag extends DatetimeStamps {
    id: number;
    title: string;
    slug: string;
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

export interface Service extends DatetimeStamps {
    id: number;
    slug: string;
    title: string;
    icon: string;
    body: string;
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
export interface Job extends DatetimeStamps {
    logo: string;
    company: Company;
    title: string;
    start_at: string;
    end_at: string;
    body: string;
    type: ResumeItemType
    skills: string;
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