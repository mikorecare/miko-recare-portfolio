import { supabase, getSupabaseWithToken } from './supabase';

export interface BlogSection {
    title: string;
    content: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    tags: string[];
    date: string;
    read_time: string;
    cover_image: string | null;
    sections: BlogSection[];
    published: boolean;
    created_at: string;
    updated_at: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }

        if (!data || data.length === 0) {
            return [];
        }

        return data
            .filter(post => post && post.slug && post.title)
            .map((post: any) => ({
                ...post,
                sections: post.sections || [],
                tags: post.tags || [],
                published: post.published || false,
                date: post.date || new Date().toISOString().split('T')[0],
                read_time: post.read_time || '5 min read'
            }));
    } catch (error) {
        console.error('Exception fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }

    if (!data) return null;

    return {
        ...data,
        sections: data.sections as BlogSection[],
    };
}

export async function createBlogPost(
    post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>,
    accessToken: string
): Promise<BlogPost | null> {
    try {
        const supabaseAuth = getSupabaseWithToken(accessToken);

        const { data, error } = await supabaseAuth
            .from('blog_posts')
            .insert({
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                author: post.author,
                tags: post.tags,
                date: post.date,
                read_time: post.read_time,
                cover_image: post.cover_image,
                sections: post.sections as any,
                published: post.published,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating blog post:', error);
            return null;
        }

        if (!data) return null;

        return {
            ...data,
            sections: data.sections as BlogSection[],
        };
    } catch (error) {
        console.error('Exception creating blog post:', error);
        return null;
    }
}