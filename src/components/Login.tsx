import { EyeSlashIcon, EyeIcon } from "@heroicons/react/16/solid";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
    const { control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<{
        email: string
        password: string
    }> = async (data) => {
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 1000))
        reset();
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-5">
            <h1 className="text-3xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg w-full">
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true, validate: (value) => !!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) }}
                    render={({ field }) => <Input label="Email" type="email" isInvalid={!!errors.email} {...field} errorMessage={!!errors.email && errors.email.message} />}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => {
                        return <Input
                            label="Password"
                            type={isPasswordVisible ? "text" : "password"}
                            endContent={<Button isIconOnly variant="light" className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? (
                                    <EyeSlashIcon className="size-6 text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeIcon className="size-6 text-default-400 pointer-events-none" />
                                )}
                            </Button>}
                            {...field} />;
                    }}
                />
                <Button type="submit" isDisabled={isSubmitting} isLoading={isSubmitting}>Sign in</Button>
            </form>
        </div>
    )
}

export default Login