import storage from '@react-native-firebase/storage';
import randomUUUID from '../../utils/UUUID';
const storageRef = storage().ref();

const uploadFile = async (
	files,
	poster,
	setProgCallback,
	loopFileCallack,
	from,
) => {
	console.log('key data outer ', files);

	let i = 0;
	const promises = [];
	let post = poster;
	for (let k = 0; k < files.length; k++) {
		const value = files[k];

		const iid = randomUUUID();

		console.log('found key ', value);
		try {
			const blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = () => {
					resolve(xhr.response);
				};
				xhr.onerror = () => {
					reject(new TypeError('Network request failed'));
				};
				xhr.responseType = 'blob';
				xhr.open('GET', value.uri, true);
				xhr.send(null);
			});
			console.log('bloby ');
			const task = storageRef.child(`${poster.userId}/media/${iid}`).put(blob);
			promises.push(task);

			task.on(
				'state_changed',
				(taskSnapshot) => {
					console.log(
						`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
					);
					const prog =
						(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
					if (setProgCallback instanceof Function)
						setProgCallback(`Uploading...${i + 1}/(${parseInt(prog)} %)`, prog);
				},
				function (error) {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					blob.close();
				},
				async () => {
					const downloadURL = await task.snapshot.ref.getDownloadURL();
					// do something with the url
					blob.close();
					const { key } = value;
					post = { ...post, [key]: downloadURL };
					
					i++;
					console.log('key counter ', i, 'key length ', promises.length);

					if (i === promises.length) {
						Promise.all(promises)
							.then(() => {
								console.log('key download found post inner ', post);

								loopFileCallack(post, from);
							})
							.catch((err) => console.log(err.code));
					}
				},
			);
		} catch (err) {
			console.log('err ', err);
		}
	}
};

export default uploadFile;
