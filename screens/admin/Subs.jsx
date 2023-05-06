import { useState } from 'react';
import { useSelector } from 'react-redux';
import GridView from '../../components/GridView';

const Subs = ({ navigation,route:{name} }) => {
	const entities = useSelector(({ entity }) => {
		console.log('entity ',entity);
		return entity[name]
	});
	console.log('entities ',entities,' name ',name);
	const selected = useSelector(
		({ entity }) => entity.selected[name] || [],
	);

	const [isLoading, setLoading] = useState(false);
	const [isSpinner, setSpinner] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	
	const onClickFun = ({ index, num }, flag) => {};
	const loadMore = () => {
		/* if (!isLoading && hasMore) {
			setLoading(true);
			console.log('startSearch loadMore ');

			startSearch(
				fb,
				schemes.length > 0 ? schemes[schemes.length - 1]?._id : null,
			);
		} */
	};
	return (
		<GridView
			{...{
				profileInfo: entities,
				orientation: 'row',
				onClickFun,
				isLoading,
				isSpinner,
				loadMore,
				selected,
			}}
		/>
	);
};

export default Subs;
