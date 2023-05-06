import { format } from 'date-fns';

export const DateTimeFormat = (dateStr) => {
	return format(new Date(dateStr), 'dd MMM yyyy HH:mm:ss');
};
