import functions from '@react-native-firebase/functions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { splitStr } from '../../utils/splitStr';
import { setSharedEmail } from '../../data/redux/slices/menu';
import { useDispatch } from 'react-redux';
import { DLINK_URL } from '../../constants';
import { isArray } from 'lodash';

export const useFunc = () => {
	const dispatch = useDispatch();
	const callFunc = async (data, name) => {
		const response = await functions().httpsCallable(name)(data);
		return response.data;
	};
	const createDlink = async (link, socialImageLink, subject, body, long) => {
		const options = {
			link,
			// domainUriPrefix is created in your Firebase console
			domainUriPrefix: DLINK_URL,
			android: {
				packageName: 'com.hmsapp',
				//androidMinPackageVersionCode: '3',
				minimumVersion: '1',
			},
			social: {
				title: subject,
				descriptionText: body,
				imageUrl: socialImageLink,
			},
		};
		let dLink;
		if (long) {
			dLink = await dynamicLinks().buildLink(options);
		} else {
			dLink = await dynamicLinks().buildShortLink(options, 'SHORT');
		}
		console.log('dLink ', dLink);
		return dLink;
	};
	const shareDLink = async (
		emails,
		link,
		body,
		subject,
		path,
		payload,
		socialImageLink,
	) => {
		dispatch(setSharedEmail(emails));

		const dLink = link
			? await createDlink(link, payload.url, subject, path)
			: null;
		console.log('dLink ', dLink);
		const { message } = await callFunc(
			{
				emails: isArray(emails)
					? emails
					: emails.includes(',')
					? splitStr(emails)
					: [emails.trim()],
				payload,
				path,
				body,
				dLink,
				subject,
				socialImageLink,
			},
			'addShare',
		);
		return message;
	};
	return {
		callFunc,
		shareDLink,
		createDlink,
	};
};
