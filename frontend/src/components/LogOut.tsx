import { IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import { removeJwt } from '../services/jwt'

export const LogOut = (props: { style: Record<string, unknown> }) => {
  const style = props.style
  const history = useHistory()
  return (
    <div>
      <IonButton
        style={style}
        fill="clear"
        onClick={() => {
          removeJwt()
            .then(() => {
              history.replace('/login')
            })
            .catch(() => {
              alert('not possible to log out')
            })
        }}
      >
        {'LogOut'}
      </IonButton>
    </div>
  )
}
