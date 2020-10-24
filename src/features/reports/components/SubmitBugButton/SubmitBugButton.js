import React, {useState} from 'react'
import ReportForm from "./ReportForm/ReportForm";
import Modal from 'react-modal'
import styles from './SubmitBugButton.module.css'

const SubmitBugButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const close = () => {
        setIsOpen(false)
    }

    const onSuccess = () => {
        close()
    }

    const onClick = () => {
        setIsOpen(true)
    }

    return (
        <div>
            <button onClick={onClick} className={styles.SubmitBugButton}>Submit a bug</button>
            <Modal isOpen={isOpen} onRequestClose={close}>
                <ReportForm onSuccess={onSuccess}/>
            </Modal>
        </div>
    )
}

export default SubmitBugButton
