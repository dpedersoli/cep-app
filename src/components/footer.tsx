import './footer.css'

export const Footer = () => {
  return (
    <div className="footer p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a target="_blank" href="https://daniel-pedersoli-portfolio.netlify.app/" className="hover:text-indigo-800 hover:font-medium">Daniel Pedersoli™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a target="_blank" href="https://daniel-pedersoli-portfolio.netlify.app/" className="mr-4 hover:text-indigo-800 hover:font-medium md:mr-6">About</a>
            </li>
            <li>
                <a target="_blank" href="https://daniel-pedersoli-portfolio.netlify.app/" className="hover:text-indigo-800 hover:font-medium">Contact</a>
            </li>
        </ul>
    </div>
  )
}