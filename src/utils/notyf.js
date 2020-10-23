import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    duration: 2000,
    types: [
		{
			type: 'encrypted',
			background: '#3d5af1',
			icon: {
				tagName: 'i',
				className: 'notyf__icon--encrypted',
            },
            dismissible: true
        },
        {
			type: 'decrypted',
			background: '#2cb978',
			icon: {
				tagName: 'i',
				className: 'notyf__icon--decrypted',
            },
		}
	]
});

const notyfEncrypted = (encryptedMessage) => {
    const notification = notyf.open({ type: 'encrypted', message: 'Encrypted, click to copy', duration: 990000 })
    .on('click', () => {
        copyToClipboard(encryptedMessage);
    });
    notyf.dismiss(notification);
};

const notyfDecrypted = () => {
    const notification = notyf.open({ type: 'decrypted', message: 'Decrypted, click to copy', duration: 990000 })
    .on('click', () => notyf.dismiss(notification));
};

const notyfError = (message, duration) => notyf.error({ message, duration });
const notyfSuccess = (message, duration) => notyf.success({ message, duration });

const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        notyfSuccess('Copied encrypted message 📋', 2500);
    }, () => notyfError('Failed to copy invite link 🙁', 3000));
};

export { notyfSuccess, notyfError, notyfEncrypted, notyfDecrypted };