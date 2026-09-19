"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { registerAction } from '../_actions/authActions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);
    const [role, setRole] = useState("CUSTOMER");

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Registration Failed");
        }
    }, [state]);

    return (
        <form action={action} className='space-y-4'>
            <Card className='border-2 border-foreground/5 bg-linear-to-br from-background to-foreground/5 p-5'>
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id='name' name='name' type='text' placeholder='Enter your full name' autoComplete='off' />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id='email' name='email' type='email' placeholder='Enter your email' autoComplete='off' />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id='password' name='password' type='password' placeholder='Enter your password' autoComplete='off' />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input type="hidden" name="role" id="role" value={role} readOnly />
                    <Select
                        value={role}
                        onValueChange={setRole}
                    >
                        <SelectTrigger className="w-full py-5 border-gray-400 text-base focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="CUSTOMER">Customer</SelectItem>
                            <SelectItem value="TECHNICIAN">Technician</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type='submit' size="lg">
                    {
                        pending ? "Submitting..." : "Register Now"
                    }
                </Button>
            </Card>
        </form>
    )
}

export default RegisterForm
