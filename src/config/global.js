import { message } from 'antd';

window.getRandomId = () => Math.random().toString(36).slice(2)

window.notify = (msg, type) => {
    const duration = 4; 

    switch(type) {
        case 'success':
            message.success(msg, duration);
            break;
        case 'error':
            message.error(msg, duration);
            break;
        case 'info':
            message.info(msg, duration);
            break;
        case 'warning':
            message.warning(msg, duration);
            break;
        default:
            message.open({ content: msg, duration });
    }
};
