import styles from '../styles/spinner.module.scss'

const Spinner = ({ size = 'md' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
};

export default Spinner;
