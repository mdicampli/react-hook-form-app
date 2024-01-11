import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { IUser } from "../App";
import { TRegisterSchema, registerSchema } from "../lib/types";

const NextUIForm = () => {

    const defaultValues: TRegisterSchema = {
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        password: "",
        passwordConfirm: ""
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

    const { control, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<TRegisterSchema>({
        mode: "all",
        defaultValues,
        resolver: zodResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<IUser & { password: string, passwordConfirm: string }> = async (data) => {
        console.log(data);
        await new Promise(res => setTimeout(res, 1000));
        setIsPasswordVisible(false);
        setIsPasswordConfirmVisible(false);
        //reset(defaultValues);
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <form className="flex flex-col gap-4 max-w-lg w-full" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.firstName}
                        errorMessage={!!errors.firstName && errors.firstName.message}
                        type="text"
                        label="First name"
                        {...field} />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.lastName}
                        errorMessage={errors.lastName && errors.lastName.message}
                        type="text"
                        label="Last name"
                        {...field} />
                )}
            />
            <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.birthday}
                        errorMessage={errors.birthday && errors.birthday.message}
                        type="date"
                        label="Birthday"
                        placeholder=" "
                        {...field} />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.email}
                        errorMessage={errors.email && errors.email.message}
                        type="email"
                        label="Email"
                        {...field} />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.password}
                        errorMessage={errors.password && errors.password.message}
                        type={isPasswordVisible ? "text" : "password"}
                        endContent={
                            <Button className="h-full aspect-square" onClick={() => setIsPasswordVisible(!isPasswordVisible)} isIconOnly variant="light">{isPasswordVisible ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}</Button>
                        }
                        label="Password"
                        {...field} />
                )}
            />
            <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                    <Input
                        isInvalid={!!errors.passwordConfirm}
                        errorMessage={errors.passwordConfirm && errors.passwordConfirm.message}
                        onPaste={(e) => e.preventDefault()}
                        type={isPasswordConfirmVisible ? "text" : "password"}
                        endContent={
                            <Button className="h-full aspect-square" onClick={() => setIsPasswordConfirmVisible(!isPasswordConfirmVisible)} isIconOnly variant="light">{isPasswordConfirmVisible ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}</Button>
                        }
                        label="Password confirmation"
                        {...field} />
                )}
            />
            <Button color="primary" type="submit" isDisabled={isSubmitting} isLoading={isSubmitting}>Send</Button>
        </form>
    )
}

export default NextUIForm