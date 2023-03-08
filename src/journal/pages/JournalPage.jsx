import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );
  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
      <JournalLayout>
        {/* con 'active' condicionamos si se renderiza el compo de una nota activa */}
          {
            (!!active) 
              ? <NoteView/>
              : <NothingSelectedView/>
          }
          {/* boton para agregar una nota */}
          <IconButton
              // isSaving es una prop del Slide de Journal, para bloquear boton trabajando
              disabled={ isSaving }
              onClick={onClickNewNote}
              size='large'
              sx={{
                color:'white',
                backgroundColor: 'error.main',
                ':hover': {backgroundColor: 'error.main', opacity:0.9},
                position: 'fixed',
                right: 50,
                bottom: 50
              }}
          >
             <AddOutlined sx={{fontSize:30}} />
          </IconButton>
      </JournalLayout>
  )
}
