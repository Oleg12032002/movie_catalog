function Footer() {
    return (
        <div className="footer">
            <div className="footer-copyright">
                Copyright © {(new Date).getFullYear()} oleg@gmail.com
            </div>
            <a class="link" href="#">
                Website Policy
            </a>
        </div>
    )
}

export {Footer}