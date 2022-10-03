import { Grid, Typography } from "@mui/material"

// contenido que es reutilizable
export const AuthLayout = ({children, title=''}) => {
  return (
    <Grid 
    container spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}

    >
        <Grid item
        xs={3}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
        >
            <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>

            {/* ZONA CHILDREN */}
            {children}
        </Grid>
    </Grid>
  )
}
