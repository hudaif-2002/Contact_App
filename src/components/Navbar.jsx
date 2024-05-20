import React from 'react'

const Navbar = () => {
return (
    <div className="my-4 h-[60px] gap-2 text-xl bg-white m-4 rounded flex justify-center items-center"> 
    {/* [60px] this []  is for manual values  */}

        <img src="/firebase.svg"/>
        <h1>Firebase Contact App</h1>

    </div>
)
}

export default Navbar
