import { Modal, Input, Button, DatePicker, Select } from "antd";
import './newTaskModal.css';
import type { NewTaskModalProps } from "../types.tsx";
export type ModalMode = 'create' | 'reset' | 'view';
import { newTodoSchema } from "../validation/validationSchema.ts";
import { useState } from "react";
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const priorities = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Urgent', label: 'Urgent' },
    ];

    const handleConfirm = async () => {
        try {
            await newTodoSchema.validate(
                {
                    date,
                    projectName,
                    description,
                    priority
                },
                { abortEarly: false }
            )
            setErrors({})
            onConfirm();
        } catch (error: any) {
            if (error.inner) {
                const newErrors: { [key: string]: string } = {};
                error.inner.forEach((validationError: any) => {
                    if (validationError.path) {
                        newErrors[validationError.path] = validationError.message;
                    }
                })
                setErrors(newErrors)
            }
        }
    }


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
                    {errors.date &&
                        <div className="error">{errors.date}</div>
                    }

                    <Input
                        type="text"
                        value={projectName}
                        onChange={(e) => onChangeProjectName(e.target.value)}
                        placeholder="Enter project name"
                        autoFocus
                        required
                    />
                    {errors.projectName &&
                        <div className="error">{errors.projectName}</div>
                    }

                    <Input.TextArea
                        value={description}
                        onChange={(e) => onChangeDescription(e.target.value)}
                        placeholder="Project description"
                        className="project_description"
                    />
                    {errors.description &&
                        <div className="error">{errors.description}</div>
                    }

                    <Select
                        value={priority || undefined}
                        onChange={onChangePriority}
                        placeholder="Select the priority"
                        className="select_priority"
                        options={priorities}
                    />
                    {errors.priority &&
                        <div className="error">{errors.priority}</div>
                    }

                    <div className="modal-actions">
                        <Button type="primary" onClick={handleConfirm}>Create</Button>
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
