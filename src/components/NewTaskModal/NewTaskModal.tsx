import { Modal, Input, Button, DatePicker, Select } from "antd";
import './newTaskModal.css';
import type { NewTaskModalProps } from "../types.tsx";
export type ModalMode = 'create' | 'reset' | 'view';
export default function NewTaskModal({
    open,
    modalMode,
    projectName,
    description,
    priority,
    date,
    onChangeProjectName,
    onChangeDescription,
    onChangePriority,
    onChangeDate,
    onConfirm,
    onCancel
}: NewTaskModalProps) {
    const priorities = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Urgent', label: 'Urgent' },
    ];


    return (
        <Modal
            title={modalMode === 'create' ? 'New Project' : 'Reset Projects'}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            {modalMode === 'create' ? (
                <>

                    <DatePicker
                        value={date}
                        onChange={onChangeDate}
                        className="select_date"
                    />

                    <Input
                        type="text"
                        value={projectName}
                        onChange={(e) => onChangeProjectName(e.target.value)}
                        placeholder="Enter project name"
                        autoFocus
                        required
                    />

                    <Input.TextArea
                        value={description}
                        onChange={(e) => onChangeDescription(e.target.value)}
                        placeholder="Project description"
                        className="project_description"
                    />

                    <Select
                        value={priority || undefined}
                        onChange={onChangePriority}
                        placeholder="Select the priority"
                        className="select_priority"
                        options={priorities}
                    />

                    <div className="modal-actions">
                        <Button type="primary" onClick={() => onConfirm()}>Create</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <p className="reset_confirm_paragraph">Are you sure that you want to reset all projects?</p>
                    <div className="modal-actions">
                        <Button danger onClick={() => onConfirm()}>Reset</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </div>
                </>
            )}
        </Modal>
    );
}
