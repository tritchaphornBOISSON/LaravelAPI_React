import React from 'react';
import styles from './SubNavbar.module.css';

export function SubNav() {
    return (
        <div className={styles.container}>
            <div className={styles['sub-nav']}>
                <div>
                    <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                        <span className="icon"><i className="fas fa-pizza-slice"/></span>
                        <span>Italiens</span>
                    </button>
                    <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                        <span className="icon"><i className="fas fa-glass-cheers"/></span>
                        <span>Français</span>
                    </button>
                    <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                        <span className="icon"><i className="fas fa-hamburger"/></span>
                        <span>Fast-food</span>
                    </button>
                    <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                        <span className="icon"><i className="fas fa-fish" showRightBorder/></span>
                        <span>Asiatique</span>
                    </button>
    
                    
                </div>
                <div>
                    {/* 
                    <button className={`button ${styles['subnav-button']}`}>
                        <span className="icon"><i className="fas fa-hotel"/></span>
                        <span>For Businesses</span>
                    </button> */}
                </div>
            </div>
        </div>
        
    );
}