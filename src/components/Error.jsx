import styles from '../styles/error.module.scss'
import { FaExclamationTriangle } from 'react-icons/fa'

const Error = ({ message = 'Error al cargar los proyectos' }) => {
  return (
    <div className={styles.container}>
      <span className={styles.errorIcon}><FaExclamationTriangle /></span>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};

export default Error;
