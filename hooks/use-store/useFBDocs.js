import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { reorder } from '../../utils/reorder';

const useFBDocs = (form, callback) => {
	const userId = useSelector(
		({
			login: {
				user: { userId },
			},
		}) => userId,
	);
	useEffect(() => {
		(async () => {
			if (form) {
				let allDocs = [];
				console.log('startSearch useFBDocs ', form);
				const {
					path: pathName,
					lastDoc,
					boolValue,
					secValue,
					lim,
					group,
				} = form;
				const _path = pathName.replace('<uid>', userId);
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
									payload = {
										...payload,
										ref: path,
										timestamp:
											payload.timestamp &&
											typeof payload.timestamp.toDate === 'function'
												? payload.timestamp.toDate().toString()
												: null,
										order: new Date(payload.timestamp.toDate()).getTime(),
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
