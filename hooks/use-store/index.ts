import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { pick, isEmpty } from 'lodash';
import randomUUUID from '../../utils/UUUID';

export const useStore = () => {
	
	const queryDoc =useCallback((
		path: string,
	) => firestore()
		.doc(path)
		.get()
		.then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				const {timestamp,updatedAt}=data
				return {
					...data,
					id:doc.id,
					timestamp: timestamp
						? timestamp.toMillis()
						: null,
						updatedAt:
					updatedAt &&
					typeof updatedAt.toDate === 'function'
						? updatedAt.toMillis()
						: timestamp &&
						typeof timestamp.toDate === 'function'
							? timestamp.toMillis()
							: null,
				};
			} else {
				return {};
			}
		})
		.catch((e) => {
			console.log('DocError', e);
			return {};
		}),[]);
	const queryCollections =useCallback(async(
		number:string, userId:string
	) => {
		
		const q= await firestore().collection('Registrar')
		.where('idNumber','==',number)
		.where('registrarId','!=',userId).get()
		
		const q1= await firestore().collection('Doctor')
		.where('idNumber','==',number)
		.where('doctorId','!=',userId).get()

		const q2= await firestore().collection('Patient')
		.where('idNumber','==',number)
		.where('patientId','!=',userId).get()
		return q.size+q1.size+q2.size
	},[]);
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
			const newRecord = picker? pick(data, picker): data;
			console.log('check path ', pathName);

			await firestore()
				.doc(`${pathName}/${_id}`)
				.set({...newRecord,[fieldId]:_id}, { merge: true });

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
		queryCollections
	};
};
