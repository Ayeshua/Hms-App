import GridView from '../../components/GridView';
import { adminInfo } from '../../constants';

const Admim = () => {
  const onClickFun = ({ index, num }, flag) => {
		
	};
	return (<GridView
		{...{
			profileInfo: adminInfo,
			onClickFun,
			
			numColumns:2
		}}
	/>)
}

export default Admim