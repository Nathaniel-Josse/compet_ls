import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./single.module.css";
import ReactMarkdown from "react-markdown";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    pictureLink?: string;
    createdAt: string;
}

async function getPost(id: string): Promise<Post | null> {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    try {
        const res = await fetch(`${backendURL}/api/posts/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

interface PageProps {
    params: { id: string };
}

const PostPage: FC<PageProps> = async ({ params }) => {
    const post = await getPost(params.id);

    if (!post) {
        return <div>Article non trouvé.</div>;
    }

    return (
        <main className={styles.singleContainer}>
            <div className={styles.singleBack}>
                <Link href="/blog" className={styles.singleBackLink}>
                    <span className={styles.singleBackArrow}>&larr;</span>
                    Retour au blog
                </Link>
            </div>
            <Image
                src="/images/logo_lumea_rect_transp.webp"
                alt="Logo de Luméa"
                className={styles.logo}
                width={240}
                height={240}
                priority
            />
            <h1 className={styles.singleTitle}>{post.title}</h1>
            {post.pictureLink && post.pictureLink !== "" && (
                <Image
                    src={post.pictureLink}
                    alt="illustration"
                    className={styles.singleImage}
                    width={800}
                    height={400}
                    style={{ width: "100%", height: "auto" }}
                    priority
                />
            )}
            <div className={styles.singleMeta}>
                {post.createdAt && (
                    <span>
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                )}
                {" · "}
                <span><strong>Auteur :</strong> {post.author}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
                <div className={styles.singleTags}>
                    {post.tags.join(", ")}
                </div>
            )}
            <article className={styles.singleContent}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
        </main>
    );
};

export default PostPage;