import React from 'react'
import styles from './SubmitBugButton.module.css'
import {Link} from "react-router-dom";

const SubmitBugButton = () => {
    return (
        <div>
            <Link to="/submitBug" className={styles.SubmitBugButton}>
                Submit a bug
            </Link>
        </div>
    )
}

export default SubmitBugButton
