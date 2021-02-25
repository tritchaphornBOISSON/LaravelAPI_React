import React from 'react';
import styles from './SearchSuggestions.module.css';

export function SearchSuggestions() {
    return (
        <div className={styles.suggestions}>
            <span className="icon is-small"><i className="fas fa-pizza-slice"></i></span><span className={styles.suggestion}>Italiens</span>
            <span className="icon is-small"><i className="fas fa-glass-cheers"></i></span><span className={styles.suggestion}>Français</span>
            <span className="icon is-small"><i className="fas fa-hamburger"></i></span><span className={styles.suggestion}>Fast-food</span>
            <span className="icon is-small"><i className="fas fa-fish"></i></span><span className={styles.suggestion}>Asiatique</span>
        </div>
    )
}