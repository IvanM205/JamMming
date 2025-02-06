import logo from "/src/assets/images/logo.png";

export default function Header() {
    return (
        <header>
          <nav>
            <img className="logoHeader" src={logo} alt="Musical note logo" />
            <h1>Jam<span className="capitalM">M</span>ming</h1>
          </nav>
        </header>
    );
}