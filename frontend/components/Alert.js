'use client';
import swal from 'sweetalert';

export const showAlert = (text, icon = 'info') => {
    swal({
        text,
        icon,
    });
};


export const showConfirmAlert = (text, onConfirm, onCancel) => {
    swal({
        text,
        icon: 'warning',
        buttons: {
            cancel: 'Cancel',
            confirm: {
                text: 'Yes',
                value: true,
                visible: true,
                className: '',
                closeModal: true,
            },
        },
        dangerMode: true,
    }).then((willConfirm) => {
        if (willConfirm) {
            onConfirm?.();
        } else {
            onCancel?.();
        }
    });
};