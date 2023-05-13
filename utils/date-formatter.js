import { format } from 'date-fns';

export const DateTimeFormat = (dateStr,formatStr='dd MMM yyyy HH:mm:ss') => {
	return format(new Date(dateStr), formatStr);
};
