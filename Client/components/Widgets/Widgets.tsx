import React from 'react'
import styles from './Widgets.module.css'

export default function Widgets() {

    const newsArticle = (heading: string, subtitle: string) => {
        return <div className={styles.widgets__article}>
            
            <div className={styles.widgets__articleRight}>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    }

    return (
        <div className={styles.widgets}>
            <div className={styles.widgets__header}>
                <h2>Latest Articles</h2>
            </div>
            <div>
            {newsArticle('Ahnaf React', 'Top news - 9999 readers')}
            {newsArticle('Ahnaf React', 'Top news - 9999 readers')}
            {newsArticle('Ahnaf React', 'Top news - 9999 readers')}
            {newsArticle('Ahnaf React', 'Top news - 9999 readers')}
            </div>
        </div>
    )
}