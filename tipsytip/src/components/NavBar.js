import React,{useState} from 'react';
import logo from '../assets/logo_tipsytip.png';
import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';
import {SearchBar} from './Search/SearchBar';
import Login from '../Pages/login'
import Modal from 'react-modal';

export function NavBar(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    };
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    };
    const customStyles = {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 30,
    },
    content : {
      position: 'absolute',
      top: '-40px',
      left: '600px',
      right: '600px',
      bottom: '600px',
      overflow: '0px',
      WebkitOverflowScrolling: 'touch',
      border:'none',
      background: 'none',
      padding:'0px',
        
    }
};

    return (
        <div className={styles['nav-bar']}>
            <Link to='/'><img src={logo} className={styles.logo} alt='Tipsytip logo' />
            </Link>
            <SearchBar small term={props.term} location={props.location} search={props.search} />
            <div className={styles.right}>
                
                <button className='button' onClick={setModalIsOpenToTrue}>Login</button>
                <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                    
                    <Login />
                </Modal>
            </div>
        </div>
    )
}