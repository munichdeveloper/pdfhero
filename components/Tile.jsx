'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Tile({ displayName, title, category, prompt, buttonText, description }) {

    const [formData, setFormData] = useState({});
    const [email, setEmail] = useState();
    const [storedFileUrl, setStoredFileUrl] = useState('');
    const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);

    async function submitFile(event) {
        event.preventDefault();
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        fetch("https://hook.eu1.make.com/re7r6vil5o33eya6tsqtkc3v1v5onwjy", {
            method: 'post',
            body: data,
        })
            .then(resp => {
                setPdfDialogOpen(false);
                setEmailDialogOpen(true);
                console.log('1', resp);
                return resp;
            })
            .then(resp => {
                return resp.text();
            })
            .then(data => setStoredFileUrl(data));
    }

    async function submitEmail(event) {
        event.preventDefault();
        fetch("https://hook.eu1.make.com/0t95ldotdtaygdl7o5ktqchra81d6qe4", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "fileUrl": storedFileUrl,
                prompt,
                email
            }),
        })
            .then(resp => {
                setEmailDialogOpen(false);
            });
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handleFileInput = (e) => {
        const fieldName = e.target.name;
        const file = e.target.files[0];

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: file
        }));
    }

    return (
        <Card className="w-[150px] md:w-[200px] m-5">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{category}</CardDescription>
            </CardHeader>
            <CardContent>
                {displayName}
            </CardContent>
            <CardFooter>
                <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
                    <DialogTrigger asChild >
                        <Button variant="outline">{buttonText}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={submitFile}>
                            <DialogHeader>
                                <DialogTitle>{displayName}</DialogTitle>
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="pdf" className="text-right">
                                        PDF file
                                    </Label>
                                    <Input
                                        onChange={handleFileInput}
                                        id="pdf"
                                        name="pdf"
                                        type="file"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Submit file</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={submitEmail}>
                            <DialogHeader>
                                <DialogTitle>Get the result mailed</DialogTitle>
                                <DialogDescription>
                                    Enter your email, we will send you the result.
                                    <br />
                                    <a className="underline">Need an API instead?</a>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="mail" className="text-right">
                                        Your E-Mail
                                    </Label>
                                    <Input
                                        onChange={handleEmailInput}
                                        id="mail"
                                        name="mail"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Get result</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>
            </CardFooter>
        </Card>
    )
}
