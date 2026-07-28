"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { registerAction } from '../_actions/authActions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Registration Failed");
        }
    }, [state]);

    return (
        <form action={action} className='space-y-4'>
            <Card className='p-5 space-y-2'>
                <Input name='name' type='text' placeholder='Enter your full name' />
                <Input name='email' type='email' placeholder='Enter your email' />
                <Input name='password' type='password' placeholder='Enter your password' />
                <Input type="hidden" name="role" id="role" defaultValue="CUSTOMER" />
                <Select
                    defaultValue="CUSTOMER"
                    onValueChange={(value) => {
                        document.querySelector<HTMLInputElement>("#role")!.value = value;
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                        <SelectItem value="TECHNICIAN">Technician</SelectItem>
                    </SelectContent>
                </Select>
                <Button type='submit'>
                    {
                        pending ? "Submitting..." : "Register Now"
                    }
                </Button>
            </Card>
        </form>
    )
}

export default RegisterForm
