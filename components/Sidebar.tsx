import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Chat, Search, Logout, More } from '@mui/icons-material'
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from "email-validator"
import { addDoc, collection, query, where, } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from '../types';
import ConversationSelect from './ConversationSelect';

const StyledContainer = styled.div`
  height: 100vh;
  min-height: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 9;
`

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  border: 2px;
`
const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`

const StyledSiderButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`

const Sidebar = () => {

  const [loggedInUser, _loading, _error] = useAuthState(auth)

  const [open, setOpen] = useState(false)

  const [recipientEmail, setRecipientEmail] = useState("")

  const toggleDialog = (isOpen: boolean) => {
    setOpen(isOpen)
    setRecipientEmail("")
  }

  const isVitingSelf = recipientEmail === loggedInUser?.email

  const queryGetConvarsationsForCurrentUser = query(collection(db, "conversations"), where("users", "array-contains", loggedInUser?.email))

  const [conversationsSnapshot] = useCollection(queryGetConvarsationsForCurrentUser)

  const isConversationAlreadyExists = (recipientEmail: string) =>
    conversationsSnapshot?.docs.find(conversation => (conversation.data() as Conversation).users.includes(recipientEmail))

  const createConversation = async () => {

    toggleDialog(false)

    if (!recipientEmail) return

    if (EmailValidator.validate(recipientEmail) && !isVitingSelf && !isConversationAlreadyExists(recipientEmail)) {
      await addDoc(collection(db, "conversations"), {
        users: [loggedInUser?.email, recipientEmail]
      })
    }

    toggleDialog(false)
  }

  const logOut = async () => {
    try {
      await signOut(auth)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={loggedInUser?.email} placeholder='right'>
          <StyledUserAvatar src={loggedInUser?.photoURL || ''} />
        </Tooltip>
        <div>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <More />
          </IconButton>
          <IconButton onClick={logOut}>
            <Logout />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <IconButton>
          <Search />
        </IconButton>
        <StyledSearchInput placeholder="Search in conversations" />
      </StyledSearch>
      <StyledSiderButton onClick={() => setOpen(true)}>
        Search a new conversation
      </StyledSiderButton>
      {
        conversationsSnapshot?.docs.map(conversation => (<ConversationSelect key={conversation.id} id={conversation.id} conversationUser={(conversation.data() as Conversation).users} />))
      }
      <Dialog open={open} onClose={() => { toggleDialog(false) }}>
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            'Please enter  a Google email address for the user you wish to chat with'
          </DialogContentText>
          <TextField
            label="Google email address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { toggleDialog(false) }}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Invite</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  )
}

export default Sidebar
