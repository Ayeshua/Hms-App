import React, { useMemo } from 'react';
import GridView from '../../components/GridView';
import { homeInfo } from '../../constants';
import { useSelector } from 'react-redux';
import { reorder } from '../../utils/reorder';

const Home = () => {
	const { categoryId } = useSelector(({ login:{user} }) => user);
	const onClickFun = ({ index, num }, flag) => {
		
	};
	const payload = useMemo(() => {
		if (categoryId !== 'Doctor') {
			return homeInfo;
		} else {
			return reorder(homeInfo, 1, null, 1, true);
		}
	}, [homeInfo, categoryId]);
	return <GridView
		{...{
			profileInfo: payload,
			onClickFun,
			
			header:'Appointments',
			//topItem, 
			subName:'name',
			numColumns:2
		}}
	/>
};

export default Home;
