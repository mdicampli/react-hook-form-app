import { Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../App";
import { useState, useEffect } from "react";

const FormWithReactHookForm = () => {

    const [currentUser, setCurrentUser] = useState<IUser>({ firstName: "", lastName: "" });

    useEffect(() => {
        setTimeout(() => {
            setCurrentUser({ firstName: "Manuel", lastName: "Di Campli" })
        }, 2000);
    }, [])

    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<IUser>({
        mode: "all",
        criteriaMode: "all",
        values: currentUser
    });

    const onSubmit: SubmitHandler<IUser> = async (formData) => {
        console.log(formData);
        await new Promise(res => setTimeout(res, 1000));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-xl bg-gray-100 p-5 rounded-2xl">
            <div className="flex flex-col gap-2">
                <label>First name</label>
                {/* <input {...register("firstName")} placeholder="First Name" className="rounded-xl p-3" /> */}
                <input {...register("firstName", { required: true })} placeholder="Insert your first name" className={`rounded-xl p-3 ${errors.firstName ? "outline outline-red-500" : ""}`} />
                {errors.firstName && <small className="text-red-500">{errors.firstName.message}</small>}
            </div>
            <div className="flex flex-col gap-2">
                <label>Last name</label>
                <input {...register("lastName")} placeholder="Insert your last name" className="rounded-xl p-3" />
            </div>
            <div className="flex flex-col gap-2">
                <label>Email</label>
                <input {...register("email")} type="email" placeholder="Insert your email address" className="rounded-xl p-3" />
            </div>
            <button className={`bg-blue-500 p-3 rounded-xl text-white mt-4 transition-all flex items-center justify-center ${isSubmitting ? "opacity-60" : ""}`} disabled={isSubmitting} type="submit">{isSubmitting ? <Spinner color="white" size="sm" /> : "Sign in"}</button>
        </form>
    );
}

export default FormWithReactHookForm