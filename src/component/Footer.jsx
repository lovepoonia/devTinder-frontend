import React from 'react'

const Footer = () => {
  return (
    <div>
     <footer className="footer footer-center bg-base-300 text-base-content fixed bottom-0 p-4 w-full mt-10">
        <aside>
          <p className="text-sm md:text-base text-center">
            &copy; {new Date().getFullYear()} — All rights reserved by <span className="font-semibold">ACME Industries Ltd</span>
          </p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer