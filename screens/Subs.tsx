import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import GridView from '../components/GridView';
import useNavOptions from '../hooks/useNavOptions';
import useFBDocs from '../hooks/use-store/useFBDocs';
import { fbQueries } from '../constants';
import { unionBy } from "lodash";

const Subs = ({ navigation,route:{name,params} }) => {
	const {
		screenName = name,
		userId,
		categoryId
	} = params || {};
	const { user } = useSelector(({ login }) => login);
	const {categoryId:catId,userId:currentId}=user
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isSpinner, setSpinner] = useState<boolean>(true);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [entities, setEntities] = useState<any[]>([]);
	const [searchEntities, setSearchEntities] = useState<{}|null>();
	const lastDocRef = useRef();

	const onClickFun = ({ index }:{index:number}) => {
		const entity=entities[index]
		const {pathName,cat}=fbQueries[screenName]
		navigation.navigate('Info',{
			info:entity,
			userId:entity[`${cat.toLowerCase()}Id`],
			categoryId:cat,
			screenName:pathName
		})
	};
	const startSearch = useCallback(
		(lastDoc?:string) => {			
			setLoading(true);
			setSearchEntities({
				...fbQueries[screenName].fb,
			    boolValue:!categoryId||catId==='Registrar'?null:{key:userId||currentId, value:`${(categoryId||catId).toLowerCase()}Id`},
				lastDoc,
			});
		},
		[categoryId, userId, screenName,currentId,catId],
	);
	const loadMore = () => {
		if (!isLoading && hasMore) {
			setLoading(true);
			console.log('startSearch loadMore ');

			startSearch(
				lastDocRef.current || entities.length > 0
					? entities[entities.length - 1]?.id
					: null,
			);
		}
	};
	const resCallback=useCallback((newEntities:any[])=>{
		setSearchEntities(null)
		const len = newEntities.length;
		setHasMore(len>0)
		setLoading(false);
		setSpinner(false);
		if (len > 0) {
			lastDocRef.current = newEntities[len - 1].id;
		}
		console.log('appointments ',newEntities.length);
		setEntities(unionBy(newEntities, entities, 'id'))
	},[entities])
	useFBDocs(searchEntities,resCallback)
	useEffect(() => startSearch(), [startSearch])
	useNavOptions(
		navigation,
		0,
		null,
		null,
		screenName,
	);
	return (
		<GridView
			{...{
				profileInfo: entities,
				orientation: 'row',
				onClickFun,
				isLoading,
				isSpinner,
				loadMore,
				screenName
			}}
		/>
	);
};

export default Subs;
