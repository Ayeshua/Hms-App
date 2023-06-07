import { useCallback } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { shallowEqual, useSelector } from "react-redux";
import { LOGO_URL } from "../constants";
import { startCase } from "lodash";
import { cloudFunc } from "./functions/useFunc";

export const  useInputSheet = () => {
    const  { username, userId, profileUrl, email } = useSelector(({
		login:
		{user: 
		{ 
		name: username, 
		userId, 
		profileUrl, 
		email
	 }}
	}) => {
		return { 
			username, 
			userId, 
			profileUrl, 
			email
		 }
	},shallowEqual);
    
    const openShareInput=useCallback((payload:any,context='global')=>{
		console.log('openShareInput');
		
		SheetManager.show('text-input-sheet', {
			payload,
			context
		});
	},[])

    const dispatchDLink = async (
            emails:string|string[],
            subject:string,
            title:string,
            funcName:string
            ,extras={}
        ) => {
        const { shareDLink } = cloudFunc();

		const payload = {
			profileUrl,
			username,
			userId,
			email,
            ...extras,
			url: LOGO_URL,
		};
		//https://hmsappzambia.page.link/?sd=You%2520have%2520been%2520Assign%2520to%2520HmsApp%2520by%2520Bmash&si=https://firebasestorage.googleapis.com/v0/b/hospital-management-syst-996a1.appspot.com/o/hms.png?alt=media&token=21deff3e-9238-4fe1-8d23-beb84da1d143&st=HmsApp%2520Assign&link=hospital-management-syst-996a1.web.app%2F%3Fid%3D69a99b93-4f6d-4652-ae18-dd5bacc6ea56%26admin%3Demfe45h1lWX4iHF8nobJHEipiTU2%26type%3D1%26password%3Dtrue%26password%3Dtrue
		//https://hospital-management-syst-996a1.web.app/auth/params?mode=verifyEmail&oobCode=vX2P1jpRUcypd2S7kRrKWqkyTiKfvfZ9nB3PJBdAV4YAAAGIjteCNg&apiKey=AIzaSyCUvz-YK7bVJFi7tImTy8NabC0eFJgCr8g&continueUrl=https%3A%2F%2Fhmsappzambia.page.link%3Fsd%3DYou%252520have%252520been%252520Assign%252520to%252520UmoApp%252520by%252520Bmash%26si%3Dhttps%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fhospital-management-syst-996a1.appspot.com%2Fo%2Fhms.png%3Falt%3Dmedia%26token%3D21deff3e-9238-4fe1-8d23-beb84da1d143%26st%3DHmsApp%252520Assign%26link%3Dhospital-management-syst-996a1.web.app%252F%253Fid%253D4360550e-0b18-4d18-809b-cd2fa1bf8761%2526admin%253Demfe45h1lWX4iHF8nobJHEipiTU2%2526type%253D1%2526password%253Dtrue%2526password%253Dtrue&lang=en
		const body = `You have been ${title} to HmsApp by ${startCase(
			username,
		)}`;
		const message = await shareDLink(
			emails,
			null,
			body,
			subject,
			payload,
			LOGO_URL,
			funcName
		);
		SheetManager.hide('text-input-sheet')

		SheetManager.show('confirm-opt-sheet', {
            payload: {
                title,
                
                message,
                btnLabel: 'Okay',
                
            },
            context:'global'
        });
	};
    return {
        openShareInput,
        dispatchDLink
    }
}

