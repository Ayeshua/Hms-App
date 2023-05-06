import { memo } from 'react';
import { View, ScrollView } from 'react-native';

import { Divider } from 'react-native-paper';
import { insert, cloneCell, tools } from '../constants';
import { screenStyles } from '../styles';
import Dot from './dot';
import TopLabel from './top-label';
import WrapContent from './wrap-content';
import { colors } from '../theme/colors';

const ToolsPanel = ({
	orientationIsLandscape,
	selElement,
	toolPress,
	selTool,
	isCloning,
}) => {
	return (
		<View
			style={{
				flex: 1,
				...screenStyles.border,
				...screenStyles.column,
				justifyContent: 'space-between',
			}}
		>
			{selElement && (
				<>
					<TopLabel
						label={'Tools'}
						justifyContent='center'
						customStyle={{
							borderColor: '#fff',
							borderWidth: 1,
						}}
					/>
					<ScrollView horizontal={orientationIsLandscape}>
						{selElement.subSel && (
							<>
								<WrapContent
									width={!orientationIsLandscape ? '100%' : '30%'}
									flexWrap={!orientationIsLandscape ? 'wrap' : 'nowrap'}
								>
									{[insert, cloneCell, ...tools[selElement.subSel.label]].map(
										(item) => {
											const {
												icon,
												opt,
												label,
												field,
												nest,
												pos,
												message,
												rotate = '0deg',
												flag,
											} = item;
											const {
												subSel: { payload, flag: subSelFlag },
											} = selElement;

											return (
												<Dot
													key={label}
													size={22}
													bg={
														pos === 23 && isCloning ? colors.ORANGE_1 : 'white'
													}
													rotate={rotate}
													color={
														pos === 5 || pos === 6 || pos === 16
															? nest
																? payload[nest][field]
																: payload[field]
															: 'white'
													}
													iconSize={19}
													disabled={flag === subSelFlag}
													iconColor={
														selTool?.label === label
															? colors.secondary
															: 'black'
													}
													iconName={icon}
													handlePress={() =>
														toolPress(
															payload,
															opt,
															message,
															label,
															field,
															nest,
															pos,
															item,
														)
													}
												/>
											);
										},
									)}
								</WrapContent>
								{!orientationIsLandscape && <Divider />}
							</>
						)}
						<WrapContent
							width={
								!orientationIsLandscape
									? '100%'
									: selElement.subSel
									? '70%'
									: '40%'
							}
							flexWrap={!orientationIsLandscape ? 'wrap' : 'nowrap'}
						>
							{tools[selElement.label].map((item) => {
								const {
									icon,
									opt,
									label,
									field,
									nest,
									pos,
									message,
									rotate = '0deg',
									flag,
									minSize,
									dLim,
									val,
									dVal = 0,
									indexed,
								} = item;
								const { payload, subSel, label: lbl } = selElement;
								let check = lbl === 'table' && !subSel;

								if (subSel) {
									if (dLim) {
										if (subSel?.flag === 0 && flag !== undefined) {
											check = flag === subSel?.flag;
										} else {
											const value = val ? payload[dLim]?.length - 1 : dVal;
											check = subSel[indexed] === value;
											console.log(
												'label ',
												label,
												' check ',
												check,
												' subSel[indexed] ',
												subSel[indexed],
												' value ',
												value,
											);
										}
									} else if (minSize) {
										check =
											flag === subSel?.flag || payload[minSize]?.length <= val;
									} else {
										check = flag === subSel?.flag;
									}
								}

								return (
									<Dot
										key={label}
										size={22}
										bg={'white'}
										rotate={rotate}
										color={
											pos === 5 || pos === 6 || pos === 16
												? nest
													? payload[nest][field]
													: payload[field]
												: 'white'
										}
										iconSize={19}
										disabled={check}
										iconColor={
											selTool?.label === label ? colors.secondary : 'black'
										}
										iconName={icon}
										handlePress={() =>
											toolPress(
												payload,
												opt,
												message,
												label,
												field,
												nest,
												pos,
												item,
												val,
											)
										}
									/>
								);
							})}
						</WrapContent>
					</ScrollView>
				</>
			)}
		</View>
	);
};

export default memo(ToolsPanel);
