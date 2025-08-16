"use client";
import React, { useEffect } from "react";
import SecretAreaStyles from "./secret.module.css";

export default function SecretArea() {
    return (
        <div className={SecretAreaStyles.container}>
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
                    type="text"
                    className={SecretAreaStyles.input}
                    placeholder="Enter your code here"
                />
                <button className={SecretAreaStyles.button}>
                    Enter
                </button>
            </div>
        </div>
    );
}
