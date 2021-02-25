import React from 'react';
import styles from './SearchResult.module.css';
import { BusinessRating } from '../../../../components/BusinessRating';

export function SearchResult(props) {
    const b = props.business;
    if (!b) {
        return (<div/>);
    }

    const tags = b.categories.map(category => (<span className={`tag ${styles['business-tag']}`} key={b.id + category.title}>{category.title}</span>));
    const addressLines = b.location.display_address.map(addressLine => <p key={b.id + addressLine}>{addressLine}</p>);
    console.log(b);
    function redirect (a){
        window.location.assign(a)
    }
    return (
        <div key={b.id} className={styles['search-result']}>
            <img src={b.image_url} alt='business' className={styles['business-image']} onClick={() => redirect(b.url)}/>
            <div className={styles['business-info']}>
                <h2 className="subtitle" onClick={() => redirect(`restaurant/${b.id}`)}>{b.name}</h2>
                <BusinessRating reviewCount={b.review_count} rating={b.rating}/>
                <p>{b.price} {tags}</p>
            </div>
            <div className={styles['contact-info']}>
                <p>{b.phone}</p>
                {addressLines}
            </div>
        </div>
    )
}