import React,{useState} from 'react';
import styles from './TopNav.module.css';
import Modal from 'react-modal';
import Login from '../../../Pages/login'
import LoginApi from '../../../Pages/LoginApi'


export function TopNav() {
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
      top: '100px',
      left: '200px',
      right: '200px',
      bottom: '200px',
      overflow: '0px',
      WebkitOverflowScrolling: 'touch',
      border:'none',
      background: 'none',
      padding:'0px',
        
    }
};

    return (
        <div className={styles['top-nav']}>
        <div className={styles.left}>
            <span>Des Tips pour laisser des Tip </span>
            
        </div>
        <div className={styles.right}>
            
            <button className='button' onClick={setModalIsOpenToTrue}>Login</button>
            <Modal isOpen={modalIsOpen} ariaHideApp={ false } style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                
                <Login />
            </Modal>
        </div>
    </div>
    );
}
