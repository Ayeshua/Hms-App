import functions from '@react-native-firebase/functions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { splitStr } from '../../utils/splitStr';
import { DLINK_URL } from '../../constants';
import { isArray } from 'lodash';

export const cloudFunc = () => {
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
				packageName: 'org.umoapp',
				//androidMinPackageVersionCode: '3',
				minimumVersion: '3',
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
		console.log('createDlink ', dLink);
		return dLink;
	};
	const shareDLink = async (
		emails,
		link,
		body,
		subject,
		payload,
		socialImageLink,
		func
	) => {
		const dLink = link
			? await createDlink(link, payload.url, subject, body)
			: null;
		console.log('shareDLink ', dLink);
		const { message } = await callFunc(
			{
				emails: isArray(emails)
					? emails
					: emails.includes(',')
					? splitStr(emails,',')
					: [emails.trim()],
				payload,
				body,
				dLink,
				subject,
				socialImageLink,
			},
			func,
		);
		return message;
	};
	return {
		callFunc,
		shareDLink,
		createDlink,
	};
};
