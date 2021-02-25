import React from 'react';
import { TopNav } from './TopNav/TopNav';
import { TopNavR } from './TopNav/TopNavR';
import logo from '../../assets/logo_tipsytip.png';
import styles from './LandingPage.module.css';
import { SearchBar } from '../../components/Search/SearchBar';
import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';
import useReactRouter from 'use-react-router';

// import Carousel from '../../Component/carousel'

export function LandingPage () {
    const { history } = useReactRouter();

    function search(term, location) {
        const urlEncodedTerm = encodeURI(term);
        const urlEncodedLocation = encodeURI(location);
        history.push(
            `/search?find_desc=${urlEncodedTerm}&find_loc=${urlEncodedLocation}`

        );
    }
    return (
        <div className={styles.landing}>
            <div className={styles['search-area']}>
                <TopNav /><TopNavR />
                <img src={logo} className={styles.logo} alt="Logo Tipsytip" />
                
                <SearchBar search={search} />
                <SearchSuggestions />
            </div>
        </div>
    )
}
