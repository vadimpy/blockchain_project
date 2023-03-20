import React, { useState } from 'react';

import axios from 'axios';
// import { t, color } from 'react-native-tailwindcss'
import './Waitlist.css'
import {useForm, Controller} from 'react-hook-form'
import next from "../img/Next.svg"

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SpreadSheet () {
	// const [name, setName] = useState('');
	// const [email, setAge] = useState('');
	// const [data,setData]= useState([]);
		// export default function App() {
	const { handleSubmit, control,  formState: { errors } } = useForm();
	

//   const onErrors = (errors) => {
//     console.warn(errors)
//   }
	const onSubmit  = async ({name,email,phone}) => {

		const objt = {Name: name,Email: email,Phone:phone};
		// console.log(objt)
		axios
			.post(
				'https://sheet.best/api/sheets/9357e76b-e1ab-4cff-92a3-1917f5786ddc',
				objt
			)
			.then((response) => {
				window.alert("Success, thank you!")
			});
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

// const styles = {
//   container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, t.bgGray200],
//   switch: [t.mB4, t.selfStart, t.flexRow, t.itemsCenter],
//   switchText: [t.textBase, t.mR3, t.textGray800],
//   errorText: [ t.textRed500]
// };

export default SpreadSheet;