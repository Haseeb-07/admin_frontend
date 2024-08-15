import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <Sidebar style={{ height: '150.6vh', backgroundColor:' #00006D' }}>
      <div style={{ padding: '20px', textAlign: 'center', color: '#000000', fontSize: '2.2em', fontWeight: 'bold' }}>
        TravelSage
      </div>
      <Menu
        menuItemStyles={{
          button: ({ active, disabled }) => ({
            color: disabled ? '#ffffff' : '#000000'
          }),
        }}
      >
        <MenuItem component={<Link to="/packagelist" />}> All Packages</MenuItem>
        <MenuItem component={<Link to="/createpackage" />}>Add package</MenuItem>
        <MenuItem component={<Link to="/destinations" />}>All Destinations</MenuItem>
        <MenuItem component={<Link to="/createdestination" />}>Add Destination</MenuItem>
        <MenuItem component={<Link to="/confirmedbookings" />}>Confirmed Bookings</MenuItem>
        <MenuItem component={<Link to="/pendingbookings" />}>Pending Bookings</MenuItem>
        <MenuItem component={<Link to="/customizedbookings" />}>Customized Bookings</MenuItem>
        <MenuItem component={<Link to="/users" />}>All Users</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
