export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            blog_posts: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    excerpt: string;
                    author: string;
                    tags: string[];
                    date: string;
                    read_time: string;
                    cover_image: string | null;
                    sections: Json;
                    published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    title: string;
                    excerpt: string;
                    author: string;
                    tags: string[];
                    date: string;
                    read_time: string;
                    cover_image?: string | null;
                    sections: Json;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    slug?: string;
                    title?: string;
                    excerpt?: string;
                    author?: string;
                    tags?: string[];
                    date?: string;
                    read_time?: string;
                    cover_image?: string | null;
                    sections?: Json;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
    };
}