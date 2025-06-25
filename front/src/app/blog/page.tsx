'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./blog.module.css";

type Post = {
    _id: string;
    title: string;
    author: string;
    content: string;
    tags: string[];
    pictureLink?: string;
    createdAt: string;
};

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`;

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(backendURL);
                if (!res.ok) throw new Error("La récupération des posts a échoué");
                const data = await res.json();
                setPosts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Erreur inconnue lors de la récupération des posts");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading)
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    if (error) return <div>Erreur : {error}</div>;

    return (
        <main>
            <Image
                src="/images/logo_lumea_rect_transp.webp"
                alt="Logo de Luméa"
                className={styles.logo}
                width={120}
                height={120}
                priority
            />
            <h1 className={styles.h1Title}>Articles de notre blog</h1>
            {posts.length === 0 ? (
                <p>Aucun post publié.</p>
            ) : (
                <ul className={styles.blogList}>
                    {posts.map((post) => (
                        <li key={post._id} className={styles.blogCard}>
                            <Link
                                href={`/blog/${post._id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                {post.pictureLink && (
                                    <div className={styles.blogImageContainer}>
                                        <Image
                                            src={post.pictureLink}
                                            alt="illustration"
                                            className={styles.blogImage}
                                            width={400}
                                            height={250}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                )}
                                <div className={styles.blogContent}>
                                    <div className={styles.blogTitle}>{post.title}</div>
                                    <div className={styles.blogDescription}>
                                        <ReactMarkdown>
                                            {post.content.length > 120
                                                ? post.content.slice(0, 120) + "[…]"
                                                : post.content}
                                        </ReactMarkdown>
                                    </div>
                                    <div className={styles.blogTags}>
                                        {post.tags && post.tags.length > 0
                                            ? post.tags.join(", ")
                                            : ""}
                                    </div>
                                    <div className={styles.blogMeta}>
                                        <span className={styles.blogReadTime}>
                                            <span role="img" aria-label="lecture">
                                                📖
                                            </span>
                                            5 min de lecture
                                        </span>
                                        <span className={styles.blogDate}>
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString(
                                                    "fr-FR",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default BlogPage;