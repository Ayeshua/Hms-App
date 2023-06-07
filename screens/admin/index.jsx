import { shallowEqual, useSelector } from 'react-redux';
import GridView from '../../components/GridView';
import { adminInfo } from '../../constants';

const Admin = ({navigation}) => {
	const { categoryId,userId } = useSelector(({ 
		login:{
		user:{ 
		categoryId,
		userId 
	}
	} 
	}) => {
		return { categoryId,userId }
	},shallowEqual);
  const onClickFun = ({ index }) => {

	const {title}=adminInfo[index]
		navigation.navigate('Admins',{
			userId:userId,
			categoryId:categoryId,
			screenName:title.substring(0,title.length-1)
		})
	};
	
	return (<GridView
		{...{
			profileInfo: adminInfo,
			onClickFun,
			
			numColumns:2
		}}
	/>)
}

export default Admin