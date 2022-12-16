import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecipient } from '../hooks/useRecipient'
import { Conversation } from '../types'
import RecipientAvatar from './RecipientAvatar'

const StyledContaier = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    word-break: break-all;
    :hover {
        background-color: #e9eaeb;
    }
`

const ConversationSelect = ({id, conversationUser}: {id: string, conversationUser: Conversation['users']}) => {

    const {recipient, recipientEmail} = useRecipient(conversationUser)

    const router = useRouter()

	const onSelectConversation = () => {
		router.push(`/conversations/${id}`)
	}
  return (
    <StyledContaier onClick={onSelectConversation}>
        <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
			<span>{recipientEmail}</span>
    </StyledContaier>
  )
}

export default ConversationSelect
