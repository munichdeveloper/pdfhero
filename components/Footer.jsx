import React from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
    return (
        <div className="mt-8 md:mt-20">
            <Separator />
            <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-center m-3">What is this?</div>
                <div className="text-center m-3">Need an API?</div>
                <div className="text-center m-3">Provide feedback</div>
                <div className="text-center m-3">Contact</div>
            </div>
        </div>
    )
}