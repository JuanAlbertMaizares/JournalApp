import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";

export const JournalPage = () => {
  return (
      <JournalLayout>
          {/* <Typography>
            Non anim duis est fugiat esse laborum. Mollit sunt est laborum ea nostrud. Commodo Lorem consectetur anim culpa magna Lorem eiusmod dolore aliqua aliquip esse commodo cupidatat. Exercitation nostrud fugiat fugiat adipisicing qui ad aliquip velit officia sit cupidatat. Exercitation irure adipisicing adipisicing irure proident laborum id. Magna enim adipisicing irure exercitation culpa.
          </Typography> */}
          {/* <NothingSelectedView/> */}
          <NoteView />

          <IconButton
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
