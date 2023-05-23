import '../scss/footer.scss';


function Footer() {
    return (
        <footer className="py-3">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Kezdőlap</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Sütik</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Kapcsolat</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Adatkezelés</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">ÁSZF</a></li>
            </ul>
            <p className="text-center text-muted">Copyright &copy; {new Date().getFullYear()} FairDeal </p>
        </footer>
    )
}

export default Footer;