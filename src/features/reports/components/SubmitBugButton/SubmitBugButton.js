import React, {useState} from 'react'
import ReportForm from "./ReportForm/ReportForm";
import Modal from 'react-modal'

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
            <button onClick={onClick}>Submit a bug</button>
            <Modal isOpen={isOpen} onRequestClose={close}>
                <ReportForm onSuccess={onSuccess} />
            </Modal>
        </div>
    )
}

export default SubmitBugButton
