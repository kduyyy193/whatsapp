import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../config/firebase';
import { AppUser, Conversation } from "../types";
import { getRecipientEmail } from '../utils/getRecipienEmailt';

export const useRecipient = (conversationUsers: Conversation['users'] ) => {
    const [loggedInUser] = useAuthState(auth)

    const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser)

    const queryGetRecipient = query(
		collection(db, 'users'),
		where('email', '==', recipientEmail)
	)
	const [recipientsSnapshot, __loading, __error] =
		useCollection(queryGetRecipient)


    const recipient = recipientsSnapshot?.docs[0]?.data() as AppUser | undefined

    return {
        recipient,
		recipientEmail
	}
}