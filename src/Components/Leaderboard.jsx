import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { auth, db } from './Auth/Firebase'
import {getDocs, collection, addDoc, updateDoc, doc} from 'firebase/firestore'

const Leaderboard = () => {

    const pointsRef = collection(db, "Points")
    const [fetchedPoints, setfetchedPoints] = useState([]);
    const index = 0;

    useEffect(() => {
        const getPoints = async () => {
            try {
                const data = await getDocs(pointsRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id:doc.id,
                }))
                setfetchedPoints(prevPoints => [
                    ...filteredData.map(note => ({
                        name: note.user.userName,
                        point: note.points
                    }))
                ]);
            } catch (error) {
                console.log(error)
            }
        }
        getPoints();
      },[])

  return (
    <>
    <Navbar/>
    <div className='container mt-5'>
        <h1 className='text-danger text-center'>Leaderboard</h1>
        <table className="table mt-5">
            <thead>
                <tr>
                <th scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
                </tr>
            </thead>
            <tbody>
                {
                    fetchedPoints.sort((a, b) => b.point - a.point).map((point, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{point.name}</td>
                            <td>{point.point}</td>
                        </tr>
                    ))
                }
                {/* <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>25</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>15</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>happy</td>
                <td>5</td>
                </tr> */}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Leaderboard