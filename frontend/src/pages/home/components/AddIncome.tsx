import { useContext, useEffect, useState } from 'react'
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  useIonModal,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react'
import { OverlayEventDetail } from '@ionic/core/components'
import Categories from './Categories'
import DateDialog from './DateDialog'
import MoneyInput from './MoneyInput'
import { getIncomeCategories } from '../../../services/categories/getIncomeCategories'
import { addIncome } from '../../../services/account/addIncome'
import { BalanceContext } from '../../../context/Context'

const Modal = ({
  onDismiss
}: {
  onDismiss: (
    data?: string | null | undefined | number | Record<string, unknown>,
    role?: string
  ) => void
}) => {
  const [income, setIncome] = useState<number | undefined>(undefined)
  const [chosenCategoryId, setChosenCategoryId] = useState<number | undefined>(
    undefined
  )
  const [date, setDate] = useState<Date>(new Date(Date.now()))
  const [categories, setCategories] = useState<[Record<string, unknown>]>([{}])

  useEffect(() => {
    const getIncCategories = async () => {
      try {
        const cagegories = await getIncomeCategories()
        setCategories(cagegories)
      } catch (err) {
        alert(`error while fetching categories from the server: ${err}`)
        onDismiss(null, 'cancel')
      }
    }
    getIncCategories()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => { onDismiss(null, 'cancel') }}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle class="ion-text-center">Add Your Income</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => { onDismiss({ income, chosenCategoryId, date }, 'confirm') }
              }
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <Categories
                  onCategoryChange={(chosenCategory: any) => {
                    setChosenCategoryId(chosenCategory)
                  }}
                  categories={categories}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-justify-content-center">
              <IonItem style={{ paddingLeft: '4%' }}>
                <MoneyInput
                  onMoneyChange={(money: number) => {
                    setIncome(money)
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol>
              <DateDialog
                date={date}
                setDate={(newDate: Date) => {
                  setDate(newDate)
                }}
                dayWindow={30}
              ></DateDialog>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

function AddIncome() {
  const [present, dismiss] = useIonModal(Modal, {
    onDismiss: (data: string, role: string) => { dismiss(data, role) }
  })

  const { setBalance } = useContext(BalanceContext)
  function openModal() {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          const { income, chosenCategoryId, date } = ev.detail.data
          if (income && chosenCategoryId && date) {
            const result = await addIncome(income, chosenCategoryId, date)
            if (result) {
              setBalance(result.balance); return
            }
            alert('error while adding income'); return
          }
          alert('Please fill out all fields')
          ev.detail.role = 'cancel'
        }
      }
    })
  }

  return (
    <>
      <IonButton
        expand="block"
        class="round"
        style={{
          backgroundColor: '#4ECCA3'
        }}
        onClick={() => { openModal() }}
      >
        Add Income
      </IonButton>
    </>
  )
}

export default AddIncome
