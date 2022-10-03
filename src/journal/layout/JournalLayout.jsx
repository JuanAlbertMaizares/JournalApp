import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components"; 

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
        //  def la caja 
        <Box sx={{display: 'flex'}}>
            {/* def los elementos */}
            <NavBar drawerWidth={drawerWidth}/>
            <SideBar drawerWidth={drawerWidth} />
            {/* def la caja central */}
            <Box component='main' sx={{flexGrow: 1, p:3}}>
                {/* se coloca un toolbar componente, para posicionarse en la capa del NavBar. */}
                <Toolbar/> 
                {children}

            </Box>

        </Box>
  )
}
