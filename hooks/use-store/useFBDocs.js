import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { reorder } from '../../utils/reorder';
import { getSubTitle } from '../../utils/new-temp';

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
					origin,
					subPath
				} = form;
				console.log('startSearch path ', _path);
				if(timestamp1){
					console.log('timestamp ',DateTimeFormat(timestamp1,'yyyy-MM-dd'));
					console.log('timestamp1 ',DateTimeFormat(timestamp2,'yyyy-MM-dd'));
				}
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
									const {timestamp,scheduleDate,updatedAt}=payload
									payload = {
										...payload,
										id,
										ref: path,
										timestamp:
											timestamp &&
											typeof timestamp.toDate === 'function'
												? timestamp.toMillis()
												: null,
										scheduleDate:
											scheduleDate &&
											typeof scheduleDate.toDate === 'function'
												? scheduleDate.toMillis()
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
								}
								if(origin===1){
									const obj=payload[`${boolValue.value.replace('Val','')}`]
									const res=Object.entries(obj).map((entry)=>{
										const [key,value]=entry
										if(value){
											return key
										}
									})
									payload={
										...payload,
										subTitle: getSubTitle(
											res.join('|'),
											'pencil',
											'black',
											
										),
									}
								}
								if (type === 'added') {
									console.log(
										'get loans inner ' + path,
										' allDocs.length === 0  ',
										allDocs.length === 0,
									);
									if (
										allDocs.length === 0 ||
										allDocs[allDocs.length - 1].timestamp > payload.timestamp
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
									const del =origin===1?!!allDocs[position][boolValue.value]: subPath || type === 'removed';
									allDocs = reorder(
										allDocs,
										position,
										del ? null : payload,
										1,
										del,
									);
									if (subPath) {
										allDocs = [payload, ...allDocs];
									}
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
