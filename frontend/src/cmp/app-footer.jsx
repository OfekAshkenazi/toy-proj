import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare, faTwitterSquare, faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export function AppFooter() {


    return (
        <footer className="full">
            <div className="">ToysOurs</div>
            <small className="s-text">© 2023 localHostForEver.com - All Rights Reserved</small>
            <ul className="flex">
                <a href="https://www.facebook.com/"><FontAwesomeIcon style={{ color: '#4267B2' }} icon={faFacebookSquare} ></FontAwesomeIcon></a>
                <a href="https://twitter.com/"><FontAwesomeIcon style={{ color: 'white', backgroundColor: '#88c0f1' }} icon={faTwitterSquare} ></FontAwesomeIcon></a>
                <a href="https://github.com/OfekAshkenazi"><FontAwesomeIcon style={{ color: '#0e1318' }} icon={faGithubSquare} ></FontAwesomeIcon></a>
                <a href="https://www.linkedin.com/"><FontAwesomeIcon style={{ color: '#0a66c2' }} icon={faLinkedin} ></FontAwesomeIcon></a>
            </ul>
        </footer>
    )
}