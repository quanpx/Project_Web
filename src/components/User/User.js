import React from "react";
import PageContent from "../PageContent/PageContent";


// user content
const userContent = {
    line1: "User",
    line2: "User nè",
    line3: "User nữa nè",
    line4: "User tiếp nè"
}


const User = () => {
    return (
        <>
            <PageContent content={userContent}/>
        </>
    )
}

export default React.memo(User);