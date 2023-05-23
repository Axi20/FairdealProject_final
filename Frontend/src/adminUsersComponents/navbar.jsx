import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/AdminPage/admin_page_navbar.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar() {
  return (
    <section className='sidenavbar'>
      <div className="topnav">
        <div id="Links">
          <a href="/admin-dashboard/cars">Autók</a>
          <a href="/admin-dashboard/add-car">Új autó</a>
          <a href="/admin-dashboard/users">Felhasználók</a>
          <a href="/admin-dashboard/rents">Bérlések</a>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
