"use client";
import React, { useEffect } from "react";
import SecretAreaStyles from "./secret.module.css";
import { CircleLoader } from "react-spinners";

export default function SecretArea() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [code, setCode] = React.useState("");
    const [isCodeInvalid, setIsCodeInvalid] = React.useState(false);

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
        console.log('Code changed:', event.target.value);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let inValid = false;

        // Validate the code (you can add your own validation logic here)
        if (!code.trim()) {

            return;
        }

        setIsLoading(true);

        const res = await fetch("/api/verify-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }), // send the code to your API
        });

        const data = await res.json();


        if (data.ok) {
            // Redirect to the secret content page
            console.log('Code is valid, redirecting...');
            inValid = false;
            window.localStorage.setItem('secretCode', code);
            window.location.href = '/secretfam';
        } else {
            // Handle error (e.g., show a message)
            console.log('Invalid code:', data.error);
            inValid = true;
        }

        // in 2 seconds set isLoading to false
        setTimeout(() => {
            setIsCodeInvalid(inValid);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className={SecretAreaStyles.container}>

            {/*  if is loading, set a blurred layer on top of everything which prevents clicking and adds a loader */}
            {isLoading && (
                <div className={SecretAreaStyles.loadingOverlay}>
                    <CircleLoader color="white" />
                </div>
            )}
            {/* how to have a newline in h1?  */}
            <h1 className={SecretAreaStyles.title}>
                Welcome to the Secret Area
            </h1>

            <div className={SecretAreaStyles.secret_description} >
                <p>This is a place strictly reserved to peolpe inside the Unlucky Fam Community.</p>

                <hr style={{ margin: "20px 0", border: 0 }} />
                <h2> Inside, you&apos;ll have access to exclusive content like: </h2>
                <ul className={SecretAreaStyles.list} >
                    <li> - Unreleased and Unfinished Songs</li>
                    <li> - Work in Progress songs</li>
                    <li> - Behind the Scenes</li>
                    <li> - Exclusive and Discounted Merchandise</li>
                </ul>
            </div>
            <p>If you have a code, enter it below:</p>
            <div className={SecretAreaStyles.codeBox}>
                <input
                    value={code}
                    onChange={handleCodeChange}
                    type="text"
                    className={SecretAreaStyles.input}
                    placeholder="Enter your code here"
                />
                <button
                    className={SecretAreaStyles.button}
                    onClick={handleSubmit}
                >
                    Enter
                </button>
            </div>
            {isCodeInvalid && (
                <p className={SecretAreaStyles.errorMessage}>
                    Sorry, code is not valid 🥲
                </p>
            )}

        </div>
    );
}
