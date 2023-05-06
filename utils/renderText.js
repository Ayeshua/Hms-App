import { startCase } from 'lodash';

export const renderText = (matchingString, matches, index = 1, prefix = '') => {
	// matches => ["[@michel:5455345]", "@michel", "5455345"]
	//console.log('matchingString ', matchingString, ' matches ', matches);
	return `${prefix}${matches[index]}`;
};
const containsSpecialChars = (str) => {
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(str);
};
export const subText = (text, lim = 88) => {
	const sub = text.substring(0, lim);
	console.log('sub ', containsSpecialChars(sub));

	if (containsSpecialChars(sub)) {
		const textArr = sub.split(' ');

		const last = textArr[textArr.length - 1];
		console.log('subLast special', containsSpecialChars(last));

		if (containsSpecialChars(last)) {
			const start = lim - last.length;
			let end = text.indexOf(' ', start);
			if (end === -1) {
				end = text.length;
			}
			console.log('subLast ', end, ' startIndex ', start);
			return text.substring(0, end);
		} else {
			return sub;
		}
	} else {
		// matches => ["[@michel:5455345]", "@michel", "5455345"]
		//console.log('matchingString ', matchingString, ' matches ', matches);
		return sub;
	}
};

export const NestedObjToString = (data) => {
	return Object.entries(data).reduce((cal, val) => {
		const [key, value] = val;
		let str = `^${key}^
`;
		Object.entries(value).forEach((entry) => {
			const [key, value] = entry;
			if (value) {
				str = `${str} 
 ${`*${startCase(key)}:* ${key === 'email' ? value : startCase(value)}`}`;
			}
		});
		return `${cal} ${str}
		
`;
	}, '');
};
export const NestedObjToInfoString = (data) => {
	
	return Object.entries(data).reduce((cal, val) => {
		const [key, value] = val;
		let str=''
		if (value) {

			const checkColon=key==='pronouns'
			if(checkColon){
				cal.replace(/([:]+$)/,'')
			}
			str = `${`${key === 'name'?`*${startCase(value)}*`:key === 'agender' ? `${checkColon?'':':'}${value}:` :key === 'email' ? value : startCase(value)}`}`;
		}
		if(str){

			return `${cal} ${str}
`;
		}else{
			return cal
		}
	}, '');
};
