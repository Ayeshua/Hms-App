import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { reorder } from '../../utils/reorder';

const useFBDocs = (form, callback) => {
	
	useEffect(() => {
		(async () => {
			if (form) {
				let allDocs = [];
				console.log('startSearch useFBDocs ', form);
				const {
					path: _path,
					lastDoc,
					boolValue,
					secValue,
					lim,
					group,
					timestamp1,
					timestamp2,
				} = form;
				console.log('startSearch path ', _path);

				let q;
				if (group) {
					q = firestore().collectionGroup(_path);
				} else {
					q = firestore().collection(_path);
				}
				if (boolValue) {
					console.log('_path 1 ', _path);
					const { key, value } = boolValue;
					q = q.where(value, '==', key);
				}
				if (secValue) {
					console.log('_path 1 ', _path);
					const { key, value, operation } = secValue;
					q = q.where(value, operation, key);
				}
				q = q.orderBy('timestamp', 'desc');
				if(timestamp1&&timestamp2){
					const timestamp_prev =  firestore.Timestamp.fromDate(timestamp1);
					const timestamp_nxt = new firestore.Timestamp.fromDate(timestamp2);
					q=q.where('timestamp', '>', timestamp_prev)
					  	.where('timestamp', '<', timestamp_nxt)
				}
				if (lastDoc) {
					const afterDoc = await firestore().doc(`${_path}/${lastDoc}`).get();

					if (afterDoc.exists) {
						q = q.startAfter(afterDoc);
					}
				}

				if (lim) {
					q = q.limit(lim);
				}
				const unsubscribe = q.onSnapshot(
					(querySnapshot) => {
						if (querySnapshot)
							console.log('querySnapshot ', querySnapshot.size);
						querySnapshot
							.docChanges()
							.forEach(async ({ type, doc }) => {
								const { ref:{path}, id }=doc
								let payload;
								console.log('data ');
								if (type === 'added' || type === 'modified') {

									payload = doc.data();
									const {timestamp,scheduleDate}=payload
									payload = {
										...payload,
										id,
										ref: path,
										timestamp:
											payload.timestamp &&
											typeof timestamp.toDate === 'function'
												? timestamp.toMillis()
												: null,
										scheduleDate:
											scheduleDate &&
											typeof scheduleDate.toDate === 'function'
												? scheduleDate.toMillis()
												: null,
										order: new Date(scheduleDate?.toDate()||timestamp?.toDate()).getTime(),
									};
								}

								if (type === 'added') {
									console.log(
										'get loans inner ' + path,
										' allDocs.length === 0  ',
										allDocs.length === 0,
									);
									if (
										allDocs.length === 0 ||
										allDocs[allDocs.length - 1].order > payload.order
									) {
										console.log('get loans allDocs ');
										allDocs = [...allDocs, payload];
									} else {
										console.log('get loans unshift ', allDocs.length);

										allDocs = [payload, ...allDocs];
									}
								} else if (type === 'modified' || type === 'removed') {
									const position = allDocs.findIndex(
										({ _id, userId }) => _id === id || userId === id,
									);
									const del = type === 'removed';
									allDocs = reorder(
										allDocs,
										position,
										del ? null : payload,
										1,
										del,
									);
								}
							});
						callback(allDocs);
					},
					(error) => {
						console.log('error ', error);
					},
				);
				return () => unsubscribe();
			}
		})();
	}, [form, callback]);
};

export default useFBDocs;
