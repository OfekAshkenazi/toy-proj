import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare, faTwitterSquare, faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export function AppFooter() {
    return (
        <footer className="full">
            <div className="">ToysOurs</div>
            <small className="s-text">© 2023 localHostForEver.com - All Rights Reserved</small>
            <ul className="flex">
                <a href="https://www.facebook.com/"><FontAwesomeIcon title="Facebook" style={{ color: '#0e1318', fontSize: '19px' }} icon={faFacebookSquare} ></FontAwesomeIcon></a>
                <a href="https://twitter.com/"><FontAwesomeIcon title="Twitter" style={{ color: '#0e1318', fontSize: '19px' }} icon={faTwitterSquare} ></FontAwesomeIcon></a>
                <a href="https://github.com/OfekAshkenazi"><FontAwesomeIcon title="Github" style={{ color: '#0e1318', fontSize: '19px' }} icon={faGithubSquare} ></FontAwesomeIcon></a>
                <a href="https://www.linkedin.com/"><FontAwesomeIcon title="Linkedin" style={{ color: '#0e1318', fontSize: '19px' }} icon={faLinkedin} ></FontAwesomeIcon></a>
            </ul>
        </footer>
    )
}