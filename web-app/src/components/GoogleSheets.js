import React from 'react';
import './Waitlist.css'
import {useForm, Controller} from 'react-hook-form'
import next from "../img/Next.svg"
import { useHistory } from "react-router-dom";

const { GoogleSpreadsheet } = require('google-spreadsheet');

// Config variables
const SPREADSHEET_ID = "1MkE0Ssrwj5xL-KF01GYAEa4HZkUL0vU2LpddX4Wu1AE";
const SHEET_ID = "1914324986";
const CLIENT_EMAIL = "giantsteps@giantsteps-327901.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDaHnDSuRmOCU/t\n5A00HpD4LX4k0w6taBrmLZkBZfX7vs6LPdVAZoCWXWkc+SXMYlxrNsZ70DyMmHgL\nCq7qAfVl1qSXvdQcrWJUD6uZ016utTGsDSjpZPIdkDUNAleR1NcTYy9oDYiau2/5\nM2dJj1RFh75w5yhq13FjoY3102gU4VYyleGF6uSkA1Kwj4MDM1CWxTvDTw5Oa/D6\nsgFzRO584czmFi9fXj3W8ycGGYj/KKuJ536BAQcE4arA2sXN0ed3mRHw+tnUyuCS\nhGhAoFdfAPQ1jTqkrRiWb/CA4cdlNvuy9y/AEge/QGKIYm3dprm7ETA/3UAfDMJH\nfdSmFEbNAgMBAAECggEAA4bZz35wsaw9ikeACHy0tAlAReYnvEQM/fXKHeIBKoiO\nRxAWjPZbU+hqFQQuSUdkiSiXPant9glXv431ABGiCdCA/sxx9o4TI0V8Qn4kGh0R\n6DSaRGkpGl3vjaihCS7w1KkWO3okivlG4+JMjuhDYOXDUt4EovLy1r07p2LmBu20\n0bkAyMEicsho/qmh08BHJVH4bIBeSFvqD4YO6xE2jAaomNlhHu5sOoXfvjn32SHn\nNyd1JocHWmYaeL8j4Ex/fMeaF8bMZDGR4MtAhHclq8YOZkwxk1xCGznAdJcqzgtv\nO0I790MbNO/7GzgK8sBuqih8tF/ekn13RERrUJBunQKBgQD9aI3LuECu5qR5tqRk\nM/cfssW5WR75fdAm00TEe9ugnIBs2XYjCHbmpVvx+8gzT1PtQJO0mSWJydPdXZgl\nVmeJ4lpOc+2YY1/AKYGw2sE/Bsj+5j2Pjcmmjn8yvriF98ComqHaeVzGXizWuaPJ\nCYr36KziEtJDAaZePMw1DnBZ9wKBgQDcWX7nPGlBRnbReDJZqezQmFqRhUusmKyZ\naLTh28IjyGnr9zXWoefI/lmJ5J6fv6y3lravQR7CYcIjBpXSxXAN340mC18xa3f+\na3m+JmpgWy76TDA2Wa/LYZpUqqhQhAhqw5Xc2MTs+Y1LasXZ3a4OqhdF1ZyEPDuw\nXeAHPIsUWwKBgQC0BfjmBwl8t0GVbhkvTnN7Q2eQGy4UFDsxudkatNr8KPJbYcm5\nbaP6ivLc4AAD45E99Sh5nmq6jnVCx+D0dYOswu9g2J6sKby2KUaHO4EZo1pbK3oE\nZ7gf6Q+YH0G7epyVqvTc3mb4TaMREGS4x1zAbb2UBcb171AflpWEA7PxVQKBgHyz\nhVcV4DdZymp3TH9j5CqU3kSWnCH8cUmMcTmU5cTcad1plSV3kTY1g7S/Fmovzm5D\ns/VwtBirvHOYCXgz1ltzlWzfaKsON+VbK5XKJc+MKwTp0ysfDJbcELwzrHeMkTri\nn1BRuPinriftMDVA+H1CE1OpNR+8+sawCdXulIMbAoGADz482AF8uYJljmv3u3F3\nQDXWnZUYaFAje7NMuav/plXLIyAU/MLdEBAb96NX/bAA+qXJlKdTLsOoLUYbnCCf\ntYoEIKqlZXaypgcdR9dMUkwsqoi+39KVvFnedFOvirDreuJ/p2V2RrDk6pYMFU2b\nj5fYuMzGzZkUI9ftI4IYMSc=\n-----END PRIVATE KEY-----\n".replace(/\n/g, '\n');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function GoogleSheets () {
	const { handleSubmit, control,  formState: { errors } } = useForm();
	
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const history = useHistory();

    const appendSpreadsheet = async (row) => {
        try {
            await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
            });
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsById[SHEET_ID];
            const result = await sheet.addRow(row);
            window.alert("Success, thank you!")
        } catch (e) {
            console.error('Error: ', e);
        }
    };
	const onSubmit  = async ({name,email,phone}) => {

		const objt = {Name: name,Email: email,Phone:phone};
        await appendSpreadsheet(objt);
        history.push("/");
	};
	  return (
		<div className="">

			<div className="form-group">
				<Controller
					control={control}
					render={({field:{ onChange, onBlur, value }})=> (

					<input
						className='input'
						onBlur={onBlur}
						onChange={value => onChange(value)}
						value={value}
						placeholder="Name"
						error={errors?.name}
						// errorText={errors?.name?.message}	
					/>
					)}
					name="name"
					rules={{ required: true}}
					defaultValue=""
				/>
				{errors.name?.type === "required" && <div className="errorText">Name is required.</div>}
			</div>

			<div className="form-group">
				<Controller
					control={control}
					render={({field:{ onChange, onBlur, value }}) => (
						<input
							className='input'
							onBlur={onBlur}
							onChange={(value) => {onChange(value)}}
							value={value}
							placeholder="Email"
							error={errors?.email}
							// errorText={errors?.email?.message}	
						/>)}
					name="email"
					rules={{
						required: { value: true, message: 'email is required' },
						pattern: {
							value: EMAIL_REGEX,
							message: 'Not a valid email'
						}}}
					defaultValue=""/>
				{errors.email?.type === "required" && <div className="errorText">Email is required.</div>}
				{errors.email?.type === "pattern" && <div className="errorText">Not a valid email</div>}
			</div>
		
			<div className="form-group">
				<Controller
					control={control}
					render={({field:{ onChange, onBlur, value }})=> (

					<input
						className='input'
						onBlur={onBlur}
						onChange={value => onChange(value)}
						value={value}
						placeholder="Phone"
						error={errors?.phone}
						// errorText={errors?.phone?.message}	
					/>
					)}
					name="phone"
					rules={{ required: true}}
					defaultValue=""
				/>
				{errors.phone?.type === "required" && <div className="errorText">phone is required.</div>}
			</div>
			<div style={{display: 'flex',justifyContent:'flex-end', paddingTop: 20}}>
				<button className="btn sign-up" style={{display: 'flex', paddingLeft: 25, paddingRight: 25}} onClick={handleSubmit((data) => {onSubmit(data)})} ><p style={{marginBottom: 4}}>Sign up</p>  <img className="next-image" src={next} alt="next"/></button>
			</div>
		</div>
	  );
}


export default GoogleSheets;