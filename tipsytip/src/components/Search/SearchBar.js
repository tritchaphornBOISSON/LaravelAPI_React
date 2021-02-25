import React, {useState} from 'react';
import styles from './SearchBar.css';
import 'react-icons'
export default function SearchBar(props) {
    const [term, setTerm] = useState(props.term || '');
    const [location, setLocation] = useState(props.location || '');

    function submit(e) {
        if(typeof props.search === 'function') {
            props.search(term, location);
        }
        console.log(term, location);
        e.preventDefault();

    }

    const sizeClass = props.small ?'' : 'is-medium';
    return (
        <form onSubmit={submit}>
            <div className="field has-addons">
                <p className="control">
                    <button className={`button is-static ${sizeClass}`}>Rechercher un restaurant</button>
                </p>
                <p className="control">
                    <input className={`input ${sizeClass} ${styles['input-control']}`}
                            onChange={(e) => setTerm(e.target.value)}
                            type="text"
                            value={term}
                            placeholder="burgers, sushi, italien, français"
                    />
                </p>
                <div className="control">
                    <div className={`button is-static ${sizeClass}`}>Ville</div>
                </div>
                <p className="control">
                    <input className={`input ${sizeClass} ${styles['input-control']}`}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            value={location}
                            placeholder="Où ça ?" />

                </p>
                <div className={`button ${sizeClass} ${styles['search-button']}`} onClick={submit}>
                    <span className={`icon is-small ${styles['search-icon']}`}><i className="fas fa-search"></i></span>
                </div>
            </div>
        </form>
    )
}