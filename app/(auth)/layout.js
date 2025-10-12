'use client';

import * as React from "react"
import "../globals.css";


export default function AuthLayout({ children }) { 
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}