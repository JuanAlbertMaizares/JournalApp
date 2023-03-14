import {AppRouter} from './router/AppRouter';
import { AppTheme } from './theme/AppTheme';


export const JournalApp = () => {
  return (
    // se provee el theme de la aplicacion
    <AppTheme>
        {/* se provee el router de la aplicacion general */}
        <AppRouter/>
    </AppTheme>
  )
}
