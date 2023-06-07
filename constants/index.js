import { colors } from '../theme/colors';
import randomUUUID from '../utils/UUUID';

export const LINK_URL = 'https://hospital-management-syst-996a1.web.app';
export const DLINK_URL = 'https://hmsappzambia.page.link';
export const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/hospital-management-syst-996a1.appspot.com/o/hms.png?alt=media&token=21deff3e-9238-4fe1-8d23-beb84da1d143';
export const PROFILE_URL = 'https://firebasestorage.googleapis.com/v0/b/umotto.appspot.com/o/istockphoto-1337144146-612x612.jpg?alt=media&token=9d25d951-4db4-4ab4-944d-8c9b13bf33d9';

export const SEX = [
	{ name: 'Female', label: 'Female' },
	{ name: 'Male', label: 'Male' },
	{ name: 'Other', label: 'Other' },
];
export const inputBasePayload= {
	value: '',
	required: true,
	visible: true,
	label: 'janedoe@example.com, johndoe@example',
	message: 'Enter email(s); seperated by comas',
	leftBtnLabel: 'Close',
}
export const tokenObj = {
	Registrar: [
		'Registrar',
	],
	Doctor: [
		'Doctor',
	],
	def: [
		'Doctor',
		'Registrar',
	],
};
export const profileImages = [
	{ value: 'profileUrl', title: 'Profile Pic' },
];
const {primary,tertiary,GREEN,gold,red}=colors
export const url =
	'https://firebasestorage.googleapis.com/v0/b/zeropen-d4946.appspot.com/o/placeholder.jpg?alt=media&token=22835c2a-0926-4056-b2fb-ede151dce252';

	const cancelBtn={
		_id: randomUUUID(),
		icon: 'calendar-remove',
		color: primary,
		title: 'Cancel',
		status:4,
		message: `Are you sure you want to cancel?`,
		flag:0
	}
	const backBtn={
		_id: randomUUUID(),
		icon: 'arrow-left-box',
		color: primary,
		title: 'Back',
	}
	export const backArr=[backBtn]
	 const goldRecord={key: 'Requested', color: gold, icon:'calendar-question',size:22}
	 const greenRecord={key: 'Confirmed', color: GREEN, icon:'calendar-check',size:22}
	 const redRecord={key: 'Canceled', color: red, icon:'calendar-remove-outline',size:22}
	 export const keyStatus={
		Requested:[0,1],
		Confirmed:[2,3],
		Canceled:[4]
	 }
export	const calendarStatus=[goldRecord,goldRecord,greenRecord,greenRecord,redRecord]

export const subStatus = {
	Prescription:{
		msg:[
			'pending payment',
			'Paid',
			'Fulfilled',
		],
		Patient:[
			[
				backBtn,
				{
					_id: randomUUUID(),
					icon: 'cash',
					color: tertiary,
					title: 'Pay Now',
					status:1,
					message: `Pay $$$ for your prescription`,
					flag:3
				}
			],
			backArr,
			backArr,
		],
		Registrar:[
			backArr,
			[
				backBtn,
				{
					_id: randomUUUID(),
					icon: 'check-all',
					color: tertiary,
					title: 'Mark as Fulfilled',
					status:2,
					message: `Mark this prescription as Fulfilled `,
					flag:0
				}
			],
			backArr,
		],
		Doctor:[
			backArr,
			backArr,
			backArr,
		]
	},
	Appointment:{
		msg:[
			'pending payment',
			'Paid',
			'Confirmed',
			'Done',
			'Canceled',
		],
		Patient:[
			[
				cancelBtn,
				{
					_id: randomUUUID(),
					icon: 'cash',
					color: tertiary,
					title: 'Pay Now',
					status:1,
					message: `Pay consultation fee of $$$, to book an appointment`,
					flag:3
				}
			],
			[
				cancelBtn
			],
			/* [
				cancelBtn,
				{
					_id: randomUUUID(),
					icon: 'calendar-check',
					color: tertiary,
					title: 'See Doctor',
					flag:2
				}
			], */
			backArr,
			backArr,
			backArr,
		],
		Registrar:[
			backArr,
			[
				backBtn,
				{
					_id: randomUUUID(),
					icon: 'calendar-check',
					color: colors.tertiary,
					title: 'Confirm',
					status:2,
				    flag:1
				}
			],
			[
				backBtn,
				{
					_id: randomUUUID(),
					icon: 'calendar-check',
					color: colors.tertiary,
					title: 'Reschedule',
					status:2,
				    flag:1
				}
			],
			backArr,
			backArr,
		],
		Doctor:[
			backArr,
			[
				backBtn,
			],
			[
				{
					_id: randomUUUID(),
					icon: 'calendar-check',
					color: colors.tertiary,
					title: 'Reschedule',
					status:2,
					flag:1
				},
				{
					_id: randomUUUID(),
					icon: 'check-all',
					color: colors.tertiary,
					title: 'Prescription',
					status:3,
					flag:4
				}
			],
			backArr,
			backArr,
		]
	}		
};
export const profileInfo = [
	{
		_id: randomUUUID(),
		icon: 'medical-bag',
		color: colors.tertiary,
		title: 'Prescriptions',
		
	},
	{
		_id: randomUUUID(),
		icon: 'cash-multiple',
		color: colors.tertiary,
		title: 'Payments',
		
	},

];
export const homeInfo = [
	{
		_id: randomUUUID(),
		icon: 'calendar-check-outline',
		color: colors.GREEN,
		title: 'Confirmed',
		
	},
	{
		_id: randomUUUID(),
		icon: 'calendar-question',
		color: colors.gold,
		title: 'Requested',
		
	},
	{
		_id: randomUUUID(),
		icon: 'calendar-remove-outline',
		color: colors.red,
		title: 'Cancelled',
		
	},

];
export const adminInfo = [
	{
		_id: randomUUUID(),
		icon: 'shield-account-outline',
		color: colors.tertiary,
		title: 'Registrars',
		
	},
	{
		_id: randomUUUID(),
		icon: 'stethoscope',
		color: colors.tertiary,
		title: 'Doctors',
		
	}

];
/* bind:{
	name:'amount',
	subname:'currency',
	body:'details',
	id:'precriptionId',
	agender:'timestamp'
},
cat:'Patient', */
export const notes = [
	{
		id: '0hafsoiisjfpoofksdpofkosdp',
		precriptionId: '0hafsoiisjfpoofksdpofkosdp',
		patientId: 'emfe45h1lWX4iHF8nobJHEipiTU2',
		ref: 0,
		amount: 20,
		details: 'ARVs, five tabs',
		timestamp: new Date().getMilliseconds(),
		status: 0,
		currency: 'ZMW',
		backgroundColor: colors.lightPurple,
		/* subTitle:{

		} */
	},
	{
		id: 'bksjhsfahofjsdlfsdlvfsjdfls',
		precriptionId: 'bksjhsfahofjsdlfsdlvfsjdfls',
		patientId: 'emfe45h1lWX4iHF8nobJHEipiTU2',
		ref: 0,
		amount: 200,
		details: 'prednisone 10 mg, five tabs',
		timestamp: new Date().getMilliseconds(),
		status: 0,
		currency: 'ZMW',
		backgroundColor: colors.lightPurple,
		/* subTitle:{

		} */
	},
	{
		id: 'kjfjhdkfsdgljdglfdgdfknldf',
		precriptionId: 'kjfjhdkfsdgljdglfdgdfknldf',
		patientId: 'emfe45h1lWX4iHF8nobJHEipiTU2',
		ref: 0,
		amount: 20,
		details: 'panado 10 mg, five tabs',
		timestamp: new Date().getMilliseconds(),
		status: 0,
		currency: 'ZMW',
		backgroundColor: colors.lightPurple,
		/* subTitle:{

		} */
	},
	
];
export const d_users = [
	{
		"age": 30, 
		"categoryId": "Patient", 
		"email": "Mumaba@gmail.com", 
		"emailVerified": true, 
		"gender": "Male",
		 "id": "emfe45h1lWX4iHF8nobJHEipiTU2", 
		 "idNumber": "455845987", 
		 "name": "Dr.Mumaba", 
		 speciality:'Gp',
		 "patientId": "emfe45h1lWX4iHF8nobJHEipiTU2", 
		 "profileUrl": "https://picsum.photos/id/10/200",  
		"userId": "emfe45h1lWX4iHF8nobJHEipiTU2",
		backgroundColor: colors.lightPurple,
		/* subTitle:{

		} */
	},
	{
		"age": 20, 
		"categoryId": "Patient", 
		"email": "bell@gmail.com", 
		"emailVerified": true, 
		"gender": "Female",
		 "id": "bjjdfbjklgfslgnsljgsnjl", 
		 "idNumber": "4374309398190", 
		 "name": "Dr.Bell", 
		 speciality:'Dentist',
		 "patientId": "bjjdfbjklgfslgnsljgsnjl", 
		"userId": "bjjdfbjklgfslgnsljgsnjl",
		backgroundColor: colors.lightPurple,
		/* subTitle:{

		} */
	},
	
	
	
];
export const fbQueries={ 
	Payments:{
		fb:{path: 'Payment',
		lim: 15},
		bind:{
			name:'amount',
			subname:'currency',
			body:'details',
			id:'paymentId',
			agender:'timestamp'
		},
		cat:'Patient',
		pathName:'Payment',
		iconName:'cash' ,

   },
	Prescriptions:{
		fb:{path: 'Prescription',
		lim: 15},
		bind:{
			name:'amount',
			subname:'currency',
			body:'details',
			id:'precriptionId',
			agender:'timestamp'
		},
		cat:'Patient',
		pathName:'Prescription',
		iconName:'pill' 

   },
	Doctors:{
		fb:{path: 'Doctor',
		lim: 15},
		bind:{body:'email',
		name:'name',
		agender:'speciality'},
		cat:'Doctor',
		pathName:'Profile',
		iconName:'account-box-outline' 

   },
	Registrars:{
		fb:{path: 'Registrar',
		lim: 15},
		bind:{
			body:'email',
			name:'name',
		},
		cat:'Registrar',
		pathName:'Profile',
		iconName:'account-box-outline' 

   },
	Patients:{
		fb:{
			path: 'Patient',
			lim: 15,	
		},
		bind:{
			body:'email',
			name:'name',
		},
		cat:'Patient',
		pathName:'Profile',
		iconName:'account-box-outline' 

	},
}

