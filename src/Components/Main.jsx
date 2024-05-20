import React, {useEffect, useState} from 'react'
import { Wheel } from 'react-custom-roulette'
import { auth, db } from './Auth/Firebase'
import {getDocs, collection, addDoc, updateDoc, doc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const data = [
    { option: 5 },
    { option: 10 },
    { option: 20 },
  ]


const Main = () => {
  
  const navigate = useNavigate()
  const pointsRef = collection(db, "Points")
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const getPoints = async () => {
        try {
            const data = await getDocs(pointsRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }))
            filteredData.forEach((note) => {
              if(note.user.userId === auth?.currentUser?.uid){
                setPoints(note.points)
              }
            })
        } catch (error) {
            console.log(error)
        }
    }
    getPoints();
  },[])

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const handlePoints = async () => {
    let flag = false;
    let toUpdateId=-1;

    setPoints(prevPoints => prevPoints + data[prizeNumber].option);
    const pointsdata = await getDocs(pointsRef, "Points")
    const filteredData = pointsdata.docs.map((doc) => ({
      ...doc.data(),
      id:doc.id,
   }))

    filteredData.forEach((note) => {
      if(note.user.userId === auth?.currentUser?.uid){
        flag = true;
        toUpdateId = note.id;
      }
    })

    if(flag===false){
      
      await addDoc(pointsRef, {
        points: points + data[prizeNumber].option,
        user: {
          userName: auth?.currentUser?.email,
          userId: auth?.currentUser?.uid,
        }
      });
    }
    else{
      const noteDoc = doc(db, "Points", toUpdateId);
      await updateDoc(noteDoc, {points: points + data[prizeNumber].option })
    }
  }
  
  if (!auth?.currentUser) {
      alert("please login to continue to the app")
      navigate('/')
      return null;
  }
  

  return (
    <div >
      <div>
        <Navbar />
      </div>
        <div>
            <h1 className='mt-3 text-center text-danger'>Your Points : {points}</h1>
        </div>
      <div className='mt-5' style={{marginLeft: '37%'}}>
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            spinDuration={0.2}
            backgroundColors={['yellow','blue','green']}
            textColors={["red","red","red"]}

            onStopSpinning={() => {
            setMustSpin(false);
            handlePoints();
            }}
            
        />
        </div>
        <button className='btn btn-danger mt-5' style={{display: 'block', margin: 'auto'}} onClick={handleSpinClick}>SPIN</button>
      
    </div>
  )
}

export default Main
