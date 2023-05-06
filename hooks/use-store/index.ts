import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { pick, isEmpty } from 'lodash';
import randomUUUID from '../../utils/UUUID';

export const useStore = () => {
	
	const queryDoc = (
		path: string,
		callback?: (data?: any, verified?: boolean) => void,
		extras?: any,
	) => {
		firestore()
			.doc(path)
			.get()
			.then((doc) => {
				if (doc.exists) {
					const data = doc.data();
					console.log('queryDoc data ', data);

					let payload = {
						...data,
						timestamp: data.timestamp
							? data.timestamp.toDate().toString()
							: null,
						
					};
					console.log('queryDoc data ', data);
					callback(payload, extras);
				} else {
					callback();
				}
			})
			.catch((e) => {
				console.log('DocError', e);
				callback();
			});
	};
	const deleteFBDocs = async (docIds: string[], callback?: () => void) => {
		console.log('docIds ', docIds.length);

		const batch = firestore().batch();
		for (let index = 0; index < docIds.length; index++) {
			const path = docIds[index];
			console.log('docId ', path);

			batch.delete(firestore().doc(path));
		}

		await batch.commit();
		if (callback) {
			callback();
		}
	};

	const addModData = useCallback(
		async (
			data: any,
			id: string,
			pathName: string,
			picker?: any,
			callback?: () => void,
		) => {
			console.log('id ', id);

			const _id = !isEmpty(id) ? id : randomUUUID();
			const fieldId=`${pathName.toLowerCase()}Id`
			const newRecord = picker
				? {
						[fieldId]:_id,
						...pick(data, picker),
				  }
				: data;
			console.log('check path ', pathName);

			await firestore()
				.doc(`${pathName}/${_id}`)
				.set(newRecord, { merge: true });

			if (callback) {
				callback();
			}
		},
		[],
	);
	
	return {
		addModData,
		deleteFBDocs,
		queryDoc,
	};
};
